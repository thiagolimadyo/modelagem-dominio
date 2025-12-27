import { it, describe, expect } from 'vitest'
import CursoBuilder from '../data/CursoBuilder'
import Erros from '@/constants/Erros'
import AulaBuilder from '../data/AulaBuilder'
import CapituloBuilder from '../data/CapituloBuilder'
import Id from '@/shared/Id'
import Curso from '@/curso/Curso'
import NomesCurso from '../data/NomesCurso'
import NomeCapitulo from '../data/NomeCapitulo'

describe('Testes da Entidade Curso', () => {
  it('Deve criar um curso com novo Id', () => {
    const curso = CursoBuilder.criar().semId().agora()
    expect(curso.id.novo).toBeTruthy()
  })

  it('Deve lançar erro ao tentar criar curso sem nome', () => {
    try {
      const curso = CursoBuilder.criar().semNome().agora()
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_VAZIO)
      expect(erros[1].codigo).toBe(Erros.NOME_PEQUENO)
    }
  })

  it('Deve lançar erro ao tentar criar curso sem duração e sem capítulos', () => {
    expect(() =>
      CursoBuilder.criar().semDuracao().semCapitulos().agora()
    ).toThrowError(Erros.CURSO_SEM_DURACAO)
  })

  it('Deve lançar erro ao tentar criar curso sem quantidade de aulas e sem capítulos', () => {
    expect(() =>
      CursoBuilder.criar()
        .semQuantidadeDeAulas()
        .comDuracao(100)
        .semCapitulos()
        .agora()
    ).toThrowError(Erros.CURSO_SEM_AULAS)
  })

  it('Deve calcular duração do curso', () => {
    const aulas = [
      AulaBuilder.criar('Aula #01').comDuracao(1000).agora(),
      AulaBuilder.criar('Aula #02').comDuracao(1000).agora(),
      AulaBuilder.criar('Aula #03').comDuracao(1000).agora(),
    ]

    const capitulo = CapituloBuilder.criar().comAulas(aulas).agora()

    const curso = CursoBuilder.criar()
      .comCapitulos([
        capitulo,
        capitulo.clone({ id: Id.novo.valor }),
        capitulo.clone({ id: Id.novo.valor }),
      ])
      .agora()

    expect(curso.duracao.segundos).toBe(9000)
    expect(curso.props.duracao).toBe(9000)
    expect(curso.duracao.hms).toBe('02h 30m 00s')
  })

  it('Deve criar curso sem capítulos e manter a duração e quantidade de aulas', () => {
    const curso = CursoBuilder.criar()
      .semCapitulos()
      .comDuracao(9000)
      .comQuantidadeDeAulas(9)
      .agora()

    expect(curso.capitulos).toHaveLength(0)
    expect(curso.duracao.segundos).toBe(9000)
    expect(curso.props.duracao).toBe(9000)
    expect(curso.quantidadeDeAulas).toBe(9)
    expect(curso.props.quantidadeDeAulas).toBe(9)
  })

  it('Deve recalcular duração e quantidade de aulas quando tiver capítulos', () => {
    const curso = CursoBuilder.criar(10, 20)
      .comDuracao(9000)
      .comQuantidadeDeAulas(9)
      .agora()

    expect(curso.quantidadeDeAulas).toBe(200)
    expect(curso.duracao.segundos).toBeGreaterThan(9000)
  })

  it('Deve calcular ordem corretamente', () => {
    const capitulos = [
      CapituloBuilder.criar().comOrdem(1).agora(),
      CapituloBuilder.criar().comOrdem(1).agora(),
      CapituloBuilder.criar().comOrdem(1).agora(),
    ]

    const curso = CursoBuilder.criar().comCapitulos(capitulos).agora()
    expect(curso.capitulos[0].ordem.valor).toBe(1)
    expect(curso.capitulos[1].ordem.valor).toBe(2)
    expect(curso.capitulos[2].ordem.valor).toBe(3)
  })

  it('Deve criar curso com capítulos undefined', () => {
    const curso = new Curso({
      nome: NomesCurso.aleatorio,
      duracao: 9000,
      quantidadeDeAulas: 9,
      capitulos: undefined,
    })
    expect(curso.capitulos).toHaveLength(0)
    expect(curso.duracao.segundos).toBe(9000)
    expect(curso.props.duracao).toBe(9000)
    expect(curso.quantidadeDeAulas).toBe(9)
    expect(curso.props.quantidadeDeAulas).toBe(9)
  })

  it('Deve lançar erro ao criar curso com capítulo sem aula', () => {
    expect(
      () =>
        new Curso({
          nome: NomesCurso.aleatorio,
          duracao: 9000,
          quantidadeDeAulas: 9,
          capitulos: [
            { nome: NomeCapitulo.aleatorio, ordem: 1, aulas: undefined },
          ],
        })
    ).toThrowError(Erros.CAPITULO_SEM_AULAS)
  })

  it('Deve adicionar novo capítulo', () => {
    const curso = CursoBuilder.criar().agora()
    const capitulo = CapituloBuilder.criar().comNome('Novo').agora()
    const novoCurso = curso.adicionarCapitulo(capitulo)
    expect(novoCurso.ultimoCapitulo.nome.completo).toBe(capitulo.nome.completo)
  })

  it('Deve adicionar novo capítulo no início do curso', () => {
    const curso = CursoBuilder.criar().agora()
    const capitulo = CapituloBuilder.criar().comNome('Novo').agora()
    const novoCurso = curso.adicionarCapitulo(capitulo, 0)
    expect(novoCurso.primeiroCapitulo.nome.completo).toBe(
      capitulo.nome.completo
    )
  })

  it('Deve remover um capítulo', () => {
    const curso = CursoBuilder.criar(3, 10).agora()
    const capitulo2 = curso.capitulos[1]
    const novoCurso = curso.removerCapitulo(capitulo2)
    expect(novoCurso.capitulos.length).toBe(curso.capitulos.length - 1)
    expect(novoCurso.quantidadeDeAulas).toBe(20)
  })

  it('Deve mover capítulo uma posição para baixo', () => {
    const curso = CursoBuilder.criar(3, 10).agora()
    const capitulo2 = curso.capitulos[1]
    const novoCurso = curso.moverCapituloParaBaixo(capitulo2)
    expect(novoCurso.capitulos[2].nome.completo).toBe(capitulo2.nome.completo)
  })

  it('Deve mover capítulo uma posição para cima', () => {
    const curso = CursoBuilder.criar(3, 10).agora()
    const capitulo2 = curso.capitulos[1]
    const novoCurso = curso.moverCapituloParaCima(capitulo2)
    expect(novoCurso.primeiroCapitulo.nome.completo).toBe(
      capitulo2.nome.completo
    )
  })

  it('Deve ignorar quando mover o primeiro capítulo para cima', () => {
    const curso = CursoBuilder.criar(3, 10).agora()
    const capitulo1 = curso.capitulos[0]
    const novoCurso = curso.moverCapituloParaCima(capitulo1)
    expect(novoCurso.capitulos[0].nome.completo).toBe(capitulo1.nome.completo)
  })

  it('Deve ignorar quando mover o primeiro capítulo para baixoi', () => {
    const curso = CursoBuilder.criar(3, 10).agora()
    const capitulo3 = curso.capitulos[2]
    const novoCurso = curso.moverCapituloParaBaixo(capitulo3)
    expect(novoCurso.capitulos[2].nome.completo).toBe(capitulo3.nome.completo)
  })
})
