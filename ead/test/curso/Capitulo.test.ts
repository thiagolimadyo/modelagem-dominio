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

  it('Deve devolver a última aulas do caíputulo', () => {
    const capitulo = CapituloBuilder.criar(10).agora()
    expect(capitulo.ultimaAula.ordem.valor).toBe(10)
  })

  it('Deve devolver a primeira aulas do caíputulo', () => {
    const capitulo = CapituloBuilder.criar(10).agora()
    expect(capitulo.primeiraAula.ordem.valor).toBe(1)
  })
})
