import { it, describe, expect } from 'vitest'
import NomePessoa from '../../../src/core/shared/NomePessoa'
import Erros from '../../../src/core/constants/Erros'

describe('Teste Object Value: NomePessoa.ts', () => {
  it('Deve lançar erro ao tentar criar nome vazio', () => {
    expect(() => new NomePessoa('')).toThrowError(Erros.NOME_VAZIO)
  })

  it('Deve lançar erro ao tentar criar nome menor que 4 caracteres', () => {
    expect(() => new NomePessoa('Mei ')).toThrowError(Erros.NOME_PEQUENO)
  })

  it('Deve lançar erro ao tentar criar nome maior que 140 caracteres', () => {
    const nomeGigante =
      'Pedro de Alcântara Francisco Antônio João Carlos Xavier de Paula Miguel Rafael Joaquim José Gonzaga Pascoal Cipriano Serafim de Bragança e Bourbon'
    expect(() => new NomePessoa(nomeGigante)).toThrowError(Erros.NOME_GRANDE)
  })

  it('Deve lançar erro ao tentar criar nome sem sobrenome', () => {
    expect(() => new NomePessoa('Fulano ')).toThrowError(
      Erros.NOME_SEM_SOBREBOME
    )
  })

  it('Deve lançar erro ao tentar criar nome com caracteres especiais', () => {
    expect(() => new NomePessoa('João @jooonnn')).toThrowError(
      Erros.NOME_CARACTERES_INVALIDOS
    )
  })

  it('Deve permitir cadastrar um nome válido', () => {
    const novoNome = 'Xuxa da Silva'
    const nome = new NomePessoa(novoNome)

    expect(nome.completo).toBe(novoNome)
    expect(nome.primeiroNome).toBe('Xuxa')
    expect(nome.sobrenomes).toEqual(['da', 'Silva'])
    expect(nome.ultimoSobrenome).toBe('Silva')
    expect(nome.sobrenomesFormatados).toBe('da Silva')
  })
})
