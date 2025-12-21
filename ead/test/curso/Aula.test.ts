import Erros from '@/constants/Erros'
import Aula from '@/curso/Aula'
import { it, describe, expect } from 'vitest'
import AulaBuilder from '../data/AulaBuilder'

const nome = 'Arquitetura Limpa'
const duracao = 200
const ordem = 1
const videoUrl = 'https://www.formacaodev.com.br/arquitetura-limpa-aula-1'

describe('Testes na entidade Aula.ts', () => {
  it('Deve criar uma Aula válida', () => {
    const aula = AulaBuilder.criar().agora()

    console.log(aula.toJson)
    expect(aula).toBeDefined()
  })

  it('Deve possuir ordem padrão como 1', () => {
    const aula = AulaBuilder.criar().semOrdem().agora()
    expect(aula.ordem.valor === 1).toBeTruthy()
  })

  it('Deve retornar informações da aula no formato json', () => {
    const aula = AulaBuilder.criar().agora()
    expect(aula.toJson).toHaveProperty('nome')
    expect(aula.toJson).toHaveProperty('duracao')
    expect(aula.toJson).toHaveProperty('videoUrl')
    expect(aula.toJson).toHaveProperty('ordem')
  })

  it('Deve lançar erro com duração zerada', () => {
    expect(() => AulaBuilder.criar().semDuracao().agora()).toThrowError(
      Erros.AULA_DURACAO_ZERADA
    )
  })

  it('Deve lançar erro ao tentar criar aula com ordem negativa ou zero', () => {
    expect(() => AulaBuilder.criar().comOrdem(0).agora()).toThrowError(
      Erros.ORDEM_INVALIDA
    )
  })

  it('Deve lançar erro ao tentar criar aula com nome pequeno', () => {
    try {
      const aula = AulaBuilder.criar().comNome('X').agora()
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_PEQUENO)
    }
  })

  it('Deve lançar erro ao tentar criar uma Aula com duração zerada', () => {
    expect(() => new Aula({ nome, duracao: 0, ordem, videoUrl })).toThrowError(
      Erros.AULA_DURACAO_ZERADA
    )
  })
})
