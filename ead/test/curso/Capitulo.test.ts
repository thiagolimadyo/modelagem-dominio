import { it, describe, expect } from 'vitest'
import CapituloBuilder from '../data/CapituloBuilder'
import Erros from '@/constants/Erros'
import AulaBuilder from '../data/AulaBuilder'
import Ordem from '@/shared/Ordem'
import Capitulo from '@/curso/Capitulo'

describe('Testes com a Entidade Capitulo.ts', () => {
  it('Deve lançar erro para Capítulo sem Nome', () => {
    try {
      const capitulo = CapituloBuilder.criar(2).semNome().agora()
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_VAZIO)
      expect(erros[1].codigo).toBe(Erros.NOME_PEQUENO)
    }
  })

  it('Deve lançar erro para Capítulo sem Aulas', () => {
    expect(() => CapituloBuilder.criar().semAulas().agora()).toThrowError(
      Erros.CAPITULO_SEM_AULAS
    )
  })

  it('Deve assumir como ordem padrão o valor 1', () => {
    const capitulo = CapituloBuilder.criar(1).semOrdem().agora()
    expect(capitulo.ordem.valor).toBe(1)
  })

  it('Deve lançar erro para Capítulo com Ordem 0 ou negativa', () => {
    expect(() => CapituloBuilder.criar().comOrdem(0).agora()).toThrowError(
      Erros.ORDEM_INVALIDA
    )
    expect(() => CapituloBuilder.criar().comOrdem(-10).agora()).toThrowError(
      Erros.ORDEM_INVALIDA
    )
  })

  it('Deve calcular duração do Capítulo', () => {
    const aulas = [
      AulaBuilder.criar('Aula #1').comOrdem(1).comDuracao(63).agora(),
      AulaBuilder.criar('Aula #2').comOrdem(2).comDuracao(1007).agora(),
      AulaBuilder.criar('Aula #3').comOrdem(3).comDuracao(3784).agora(),
    ]
    const capitulo = CapituloBuilder.criar().comAulas(aulas).agora()

    expect(capitulo.duracao.segundos).toBe(4854)
    expect(capitulo.duracao.hm).toBe('01h 20m')
    expect(capitulo.duracao.hms).toBe('01h 20m 54s')
  })

  it('Deve calcular ordem corretamente', () => {
    const aulas = [
      AulaBuilder.criar('Aula #1').semOrdem().comDuracao(63).agora(),
      AulaBuilder.criar('Aula #2').semOrdem().comDuracao(1007).agora(),
      AulaBuilder.criar('Aula #3').semOrdem().comDuracao(3784).agora(),
      AulaBuilder.criar('Aula#100').comOrdem(100).comDuracao(3784).agora(),
      AulaBuilder.criar('Aula #11').comOrdem(11).comDuracao(3784).agora(),
    ]

    const capitulo = CapituloBuilder.criar().comAulas(aulas).agora()

    capitulo.aulas.map((aula) => console.log(aula.toJson))
    expect(capitulo.aulas[0].ordem.valor).toBe(1)
    expect(capitulo.aulas[1].ordem.valor).toBe(2)
    expect(capitulo.aulas[2].ordem.valor).toBe(3)
  })

  it('Deve devolver a quantidade de aulas do caíputulo', () => {
    const capitulo = CapituloBuilder.criar(10).agora()
    expect(capitulo.quantidadeDeAulas).toBe(10)
  })

  it('Deve devolver a primeira e a última aula do capítulo', () => {
    const aulas = [
      AulaBuilder.criar('Aula #2').comOrdem(2).agora(),
      AulaBuilder.criar('Aula #3').comOrdem(3).agora(),
      AulaBuilder.criar('Aula #1').comOrdem(1).agora(),
    ]

    const capitulo = CapituloBuilder.criar().comAulas(aulas).agora()
    expect(capitulo.primeiraAula.nome.completo).toBe('Aula #1')
    expect(capitulo.primeiraAula.ordem.valor).toBe(1)
    expect(capitulo.ultimaAula.nome.completo).toBe('Aula #3')
    expect(capitulo.ultimaAula.ordem.valor).toBe(3)

    capitulo.aulas.map((aula) => console.log(aula.toJson))
  })

  it('Deve adicionar uma nova aula', () => {
    const capitulo = CapituloBuilder.criar(3).agora()
    const novaAula = AulaBuilder.criar('#NovaAula').agora()
    const novoCapitulo = capitulo.adicionarAula(novaAula)
    expect(novoCapitulo.ultimaAula.nome.completo).toBe(novaAula.nome.completo)
    expect(novoCapitulo.quantidadeDeAulas).toBe(4)
  })

  it('Deve adicionar uma nova Aula no início do Capítulo', () => {
    const capitulo = CapituloBuilder.criar(3).agora()
    const novaAula = AulaBuilder.criar('#NovaAula').agora()
    const novoCapitulo = capitulo.adicionarAula(novaAula, 0)
    expect(novoCapitulo.primeiraAula.nome.completo).toBe(novaAula.nome.completo)
    expect(novoCapitulo.quantidadeDeAulas).toBe(4)
  })

  it('Deve remover uma Aula do Capítulo', () => {
    const capitulo = CapituloBuilder.criar(4).agora()
    const segundaAula = capitulo.aulas[1]
    const novoCapitulo = capitulo.removerAula(segundaAula)
    expect(novoCapitulo.quantidadeDeAulas).toBe(3)
  })

  it('Deve mover uma aula para uma nova posição', () => {
    const aulas = [
      AulaBuilder.criar('#Aula1').comOrdem(1).agora(),
      AulaBuilder.criar('#Aula2').comOrdem(2).agora(),
      AulaBuilder.criar('#Aula3').comOrdem(3).agora(),
      AulaBuilder.criar('#Aula4').comOrdem(4).agora(),
      AulaBuilder.criar('#Aula5').comOrdem(5).agora(),
      AulaBuilder.criar('#Aula6').comOrdem(6).agora(),
    ]

    const capitulo = CapituloBuilder.criar().comAulas(aulas).agora()
    const aula3 = capitulo.aulas[2]

    const novoCapitulo = capitulo.moverAula(aula3, 0)

    novoCapitulo.aulas.map((a) => console.log(a.toJson))
  })

  it('Deve mover uma aula para cima', () => {
    const aulas = [
      AulaBuilder.criar('#Aula1').comOrdem(1).agora(),
      AulaBuilder.criar('#Aula2').comOrdem(2).agora(),
      AulaBuilder.criar('#Aula3').comOrdem(3).agora(),
    ]

    let capitulo = CapituloBuilder.criar().comAulas(aulas).agora()
    const aula3 = capitulo.aulas[2]

    capitulo = capitulo.moverAulaParaCima(aula3)
    expect(capitulo.aulas[1].nome.completo).toBe(aula3.nome.completo)
    capitulo = capitulo.moverAulaParaCima(aula3)
    expect(capitulo.aulas[0].nome.completo).toBe(aula3.nome.completo)
    // capitulo.aulas.map((a) => console.log(a.toJson))
  })

  it('Deve mover uma aula para baixo', () => {
    const aulas = [
      AulaBuilder.criar('#Aula1').comOrdem(1).agora(),
      AulaBuilder.criar('#Aula2').comOrdem(2).agora(),
      AulaBuilder.criar('#Aula3').comOrdem(3).agora(),
    ]

    let capitulo = CapituloBuilder.criar().comAulas(aulas).agora()
    const aula1 = capitulo.aulas[0]

    capitulo = capitulo.moverAulaParaBaixo(aula1)
    expect(capitulo.aulas[1].nome.completo).toBe(aula1.nome.completo)
    capitulo = capitulo.moverAulaParaBaixo(aula1)
    expect(capitulo.aulas[2].nome.completo).toBe(aula1.nome.completo)
    capitulo = capitulo.moverAulaParaBaixo(aula1)

    capitulo.aulas.map((a) => console.log(a.toJson))
  })

  it('Deve ignorar quando mover a primeira aula para cima', () => {
    const capitulo = CapituloBuilder.criar().agora()
    const novoCapitulo = capitulo.moverAulaParaCima(capitulo.primeiraAula)
    expect(capitulo.igual(novoCapitulo)).toBeTruthy()
  })

  it('Deve ignorar quando mover a última aula para baixo', () => {
    const capitulo = CapituloBuilder.criar().agora()
    const novoCapitulo = capitulo.moverAulaParaBaixo(capitulo.ultimaAula)
    expect(capitulo.igual(novoCapitulo)).toBeTruthy()
  })
})
