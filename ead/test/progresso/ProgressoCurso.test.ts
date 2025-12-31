import { it, expect, describe } from 'vitest'
import ProgressoCursoBuilder from '../data/ProgressoCursoBuilder'
import Erros from '@/constants/Erros'
import ProgressoAulaBuilder from '../data/ProgressoAulaBuilder'
import { ProgressoAulaProps } from '@/progresso/ProgressoAula'

const builder = () => ProgressoAulaBuilder.criar().naoIniciado().naoConcluido()
const aulas: ProgressoAulaProps[] = [
  builder().comDuracao(600).agora().props,
  builder().comDuracao(600).agora().props,
  builder().comDuracao(600).agora().props,
  builder().comDuracao(600).agora().props,
  builder().comDuracao(600).agora().props,
  builder().comDuracao(600).agora().props,
]

describe('Testes para Entidade ProgressoCurso.ts', () => {
  it('Deve lancar erro ao criar progresso sem aulas', () => {
    expect(() => ProgressoCursoBuilder.criar().semAulas().agora()).toThrowError(
      Erros.PROGRESSO_CURSO_SEM_AULAS
    )
  })

  it('Deve lancar erro ao criar progresso com array de aulas vazio', () => {
    expect(() =>
      ProgressoCursoBuilder.criar().comAulas([]).agora()
    ).toThrowError(Erros.PROGRESSO_CURSO_SEM_AULAS)
  })

  it('Deve calcular a duracao assistida', () => {
    let progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()
    expect(progresso.duracaoAssistida.segundos).toBe(0)

    progresso = progresso.concluirESelecionarProximaAula()
    expect(progresso.duracaoAssistida.segundos).toBe(600)

    progresso = progresso.concluirESelecionarProximaAula()
    expect(progresso.duracaoAssistida.segundos).toBe(1200)

    progresso = progresso.concluirESelecionarProximaAula()
    expect(progresso.duracaoAssistida.segundos).toBe(1800)
  })

  it('Deve calcular a duracao total', () => {
    const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()
    expect(progresso.duracaoTotal.segundos).toBe(3600)
  })

  it('Deve calcular o percentual zero de progresso', () => {
    const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()
    expect(progresso.percentualAssistido).toBe(0)
  })

  it('Deve calcular o percentual de progresso corretamente em 50%', () => {
    let progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()

    progresso = progresso
      .concluirESelecionarProximaAula()
      .concluirESelecionarProximaAula()
      .concluirESelecionarProximaAula()

    expect(progresso.percentualAssistido).toBe(50)
  })

  it('Deve concluir a aula atual', () => {
    let progresso = ProgressoCursoBuilder.criar()
      .comAulas(aulas)
      .agora()
      .concluirAulaAtual()
      .concluirAulaAtual()

    expect(progresso.aulas[0].concluido).toBeTruthy()
    expect(progresso.aulas[1].concluido).toBeFalsy()
  })

  it('Deve concluir curso aula por aula', () => {
    const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()

    expect(progresso.percentualAssistido).toBe(0)
    expect(progresso.concluido).toBeFalsy()

    const progressoConcluido = progresso
      .concluirESelecionarProximaAula()
      .concluirESelecionarProximaAula()
      .concluirESelecionarProximaAula()
      .concluirESelecionarProximaAula()
      .concluirESelecionarProximaAula()
      .concluirESelecionarProximaAula()

    expect(progressoConcluido.percentualAssistido).toBe(100)
    expect(progressoConcluido.concluido).toBeTruthy()
  })

  it('Deve concluir curso inteiro', () => {
    const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()

    expect(progresso.percentualAssistido).toBe(0)
    expect(progresso.concluido).toBeFalsy()

    const progressoConcluido = progresso.concluirCurso()

    expect(progressoConcluido.percentualAssistido).toBe(100)
    expect(progressoConcluido.concluido).toBeTruthy()
  })

  it('Deve selecionar um progresso pelo ID', () => {
    const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()
    const selecionada = progresso.progressoAula(aulas[2].id!)
    expect(progresso.aulas[2].id.valor).toBe(selecionada?.id.valor)
    expect(progresso.progressoAula('')).toBeUndefined()
    expect(progresso.progressoAula('1234')).toBeUndefined()
  })

  it('Deve criar progresso com data indefinida', () => {
    const progresso = ProgressoCursoBuilder.criar()
      .comAulas(aulas)
      .semData()
      .agora()
    expect(progresso.data).toBeDefined()
  })

  it('Deve concluir progresso com aula selecionada', () => {
    const progresso = ProgressoCursoBuilder.criar()
      .comAulas(aulas)
      .comAulaSelecionada(aulas[5].id!)
      .agora()
      .concluirAulaAtual()
    expect(progresso.duracaoAssistida.segundos).toBe(600)
  })

  it('Deve criar progresso sem aula selecionada', () => {
    const progresso = ProgressoCursoBuilder.criar()
      .comAulas(aulas)
      .semAulaSelecionada()
      .agora()
      .concluirAulaAtual()

    expect(progresso.duracaoAssistida.segundos).toBe(600)
    expect(progresso.aulaSelecionada.id.valor).toBe(aulas[0].id)
  })

  it('Deve retornar o mesmo curso ao tentar concluir mais de uma vez', () => {
    const progresso = ProgressoCursoBuilder.criar()
      .comAulas(aulas)
      .agora()
      .concluirCurso()
    expect(progresso.concluirCurso()).toBe(progresso)
    expect(progresso.concluirAulaAtual()).toBe(progresso)
  })

  const aulaRisco = (minutos: number, duracaoEmMinutos: number) => {
    return ProgressoAulaBuilder.criar()
      .comDataInicio(new Date(2025, 0, 1, 9, minutos))
      .comDuracao(duracaoEmMinutos * 60)
      .agora().props
  }

  it('Deve calcular como risco de fraude como 0%', () => {
    const aulas = [
      aulaRisco(7, 3),
      aulaRisco(8, 5),
      aulaRisco(10, 7),
      aulaRisco(12, 2),
      aulaRisco(13, 1),
    ]
    const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()
    expect(progresso.riscoDeFraude()).toBe(0)
  })

  it('Deve calcular como risco de fraude de 25%', () => {
    const aulas = [
      aulaRisco(7, 13),
      aulaRisco(8, 5),
      aulaRisco(10, 7),
      aulaRisco(12, 2),
      aulaRisco(13, 1),
    ]
    const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()
    expect(progresso.riscoDeFraude()).toBe(25)
  })

  it('Deve calcular como risco de fraude de 100%', () => {
    const aulas = [
      aulaRisco(7, 13),
      aulaRisco(8, 15),
      aulaRisco(10, 17),
      aulaRisco(12, 12),
      aulaRisco(13, 1),
    ]
    const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()
    expect(progresso.riscoDeFraude()).toBe(100)
  })

  it('Deve calcular como risco de fraude 0% curso com apenas uma aula', () => {
    const aulas = [aulaRisco(7, 13)]
    const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()
    expect(progresso.riscoDeFraude()).toBe(0)
  })

  it('Deve iniciar a aula atual', () => {
    const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()
    const novoProgresso = progresso.iniciarAulaAtual()
    expect(novoProgresso.aulaSelecionada.dataInicio).toBeDefined()
    expect(novoProgresso.aulas[0].iniciado).toBeTruthy()
  })

  it('Deve zerar a conclusão de uma aula', () => {
    const progresso = ProgressoCursoBuilder.criar()
      .comAulas(aulas)
      .agora()
      .concluirCurso()

    expect(progresso.concluido).toBeTruthy()
    const novoProgresso = progresso.zerarAula(progresso.aulas[0].id.valor)
    expect(novoProgresso.concluido).toBeFalsy()
    expect(novoProgresso.aulas[0].concluido).toBeFalsy()
  })

  it('Deve alternar conclusão de uma aula', () => {
    const progresso = ProgressoCursoBuilder.criar().agora().concluirCurso()
    const novoProgresso = progresso.alternarAula(progresso.aulas[0].id.valor)

    expect(novoProgresso.concluido).toBeFalsy()
    expect(novoProgresso.aulas[0].concluido).toBeFalsy()

    const maisNovoProgresso = novoProgresso.alternarAula(
      novoProgresso.aulas[0].id.valor
    )
    expect(maisNovoProgresso.concluido).toBeTruthy()
    expect(maisNovoProgresso.aulas[0].concluido).toBeTruthy()
  })

  it('Deve ignorar alterar conclusão de uma aula com id inexistente', () => {
    const progresso = ProgressoCursoBuilder.criar().agora()
    const novoProgresso = progresso.alternarAula('1234')
    expect(novoProgresso.igual(progresso)).toBeTruthy()
  })
})
