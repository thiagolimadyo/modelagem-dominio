import { it, describe, expect } from 'vitest'
import CursoBuilder from '../data/CursoBuilder'
import CriarProgressoCurso from '@/progresso/CriarProgressoCurso'
import { faker } from '@faker-js/faker/locale/pt_BR'
import CapituloBuilder from '../data/CapituloBuilder'
import AulaBuilder from '../data/AulaBuilder'

describe('Testes Servico de Domínio CriarProgressoCurso.ts', () => {
  it('Deve iniciar o progresso com o mesmo numero de aulas do curso', () => {
    const curso = CursoBuilder.criar().agora()
    const progresso = new CriarProgressoCurso(curso).novo(
      faker.internet.email()
    )
    expect(curso.aulas).toHaveLength(progresso.aulas.length)
  })

  it('Deve iniciar o progresso zerado', () => {
    const curso = CursoBuilder.criar().agora()
    const progresso = new CriarProgressoCurso(curso).novo(
      faker.internet.email()
    )
    expect(progresso.percentualAssistido).toBe(0)
    expect(progresso.duracaoAssistida.segundos).toBe(0)
  })

  it('Deve criar progresso com a mesma duracão do curso', () => {
    const curso = CursoBuilder.criar().agora()
    const progresso = new CriarProgressoCurso(curso).novo(
      faker.internet.email()
    )
    expect(progresso.duracaoTotal.segundos).toBe(curso.duracao.segundos)
  })

  it('Deve sincronizar o progresso com aula alterada', () => {
    const curso = CursoBuilder.criar().agora()
    const progresso = new CriarProgressoCurso(curso)
      .novo(faker.internet.email())
      .iniciarAulaAtual()
      .concluirESelecionarProximaAula()
      .iniciarAulaAtual()
      .concluirESelecionarProximaAula()
      .iniciarAulaAtual()
      .concluirESelecionarProximaAula()

    const novaAula = curso.aulas[0].clone({ duracao: 1000 })
    const novoCurso = curso.atualizarAula(novaAula)

    const progressoNovo = new CriarProgressoCurso(novoCurso).sincronizarCom(
      progresso
    )

    expect(progresso.aulas[0].iniciado).toBeTruthy()
    expect(progressoNovo.aulas[0].iniciado).toBeFalsy()
    expect(progressoNovo.aulas[0].duracao.segundos).toBe(1000)
  })

  it('Deve sincronizar o progresso com aula nova', () => {
    const curso = CursoBuilder.criar().agora()
    const progresso = new CriarProgressoCurso(curso).novo(
      faker.internet.email()
    )

    const novoCurso = curso.adicionarCapitulo(
      CapituloBuilder.criar()
        .comAulas([AulaBuilder.criar().comDuracao(10000).agora()])
        .agora()
    )

    const progressoNovo = new CriarProgressoCurso(novoCurso).sincronizarCom(
      progresso
    )

    expect(novoCurso.duracao.segundos - curso.duracao.segundos).toBe(10000)
    expect(
      progressoNovo.duracaoTotal.segundos - progresso.duracaoTotal.segundos
    ).toBe(10000)
    expect(progressoNovo.aulas).toHaveLength(novoCurso.aulas.length)
  })

  it('Deve limpar data de conclusão com curso alterado', () => {
    const curso = CursoBuilder.criar().agora()
    const progresso = new CriarProgressoCurso(curso)
      .novo(faker.internet.email())
      .concluirCurso()

    const aulaAlterada = curso.aulas[0].clone({ duracao: 10000 })
    const cursoAlterado = curso.atualizarAula(aulaAlterada)
    const progressoAlterado = new CriarProgressoCurso(
      cursoAlterado
    ).sincronizarCom(progresso)

    expect(progresso.dataConclusao).toBeDefined()
    expect(progresso.aulas[0].concluido).toBeTruthy()
    expect(progressoAlterado.aulas[0].concluido).toBeFalsy()
    expect(progressoAlterado.dataConclusao).toBeUndefined()
  })
})
