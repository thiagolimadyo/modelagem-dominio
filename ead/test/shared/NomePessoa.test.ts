import Erros from '@/constants/Erros'
import NomePessoa from '@/shared/NomePessoa'
import { it, describe, expect } from 'vitest'

const nomeValido = 'Xuxa da Silva'

describe('Testes do Objeto de Valor NomePessoa', () => {
  it('Deve lançar erro ao tentar criar nome vazio', () => {
    try {
      const pessoa = new NomePessoa()
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_VAZIO)
      expect(erros[1].codigo).toBe(Erros.NOME_PEQUENO)
      expect(erros[2].codigo).toBe(Erros.NOME_SEM_SOBRENOME)
    }
  })

  it('Deve lançar erro ao tentar criar nome com 4 caracteres', () => {
    try {
      const p1 = new NomePessoa('xx')
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_PEQUENO)
      expect(erros[1].codigo).toBe(Erros.NOME_SEM_SOBRENOME)
    }
  })

  it('Deve criar um nome válido', () => {
    const p1 = new NomePessoa(nomeValido)
    expect(p1.nome).toBe(nomeValido)
  })

  it('Deve retornar o nome completo', () => {
    const nome = new NomePessoa(nomeValido)
    expect(nome.completo).toBe(nomeValido)
  })

  it('Deve retornar o primeiro Nome', () => {
    const nome = new NomePessoa(nomeValido)
    expect(nome.primeiroNome).toBe('Xuxa')
  })

  it('Deve retornar os sobrenomes', () => {
    const nome = new NomePessoa(nomeValido)
    expect(nome.sobrenomes[0]).toBe('da')
    expect(nome.sobrenomes[1]).toBe('Silva')
  })

  it('Deve retornar os sobrenomes formatados', () => {
    const nome = new NomePessoa(nomeValido)
    expect(nome.sobrenomesFormatados).toBe('da Silva')
  })

  it('Deve retornar o último sobrenome', () => {
    const nome = new NomePessoa(nomeValido)
    expect(nome.ultimoSobrenome).toBe('Silva')
  })

  it('Deve lançar erro ao tentar criar nome maior que 140 caracteres', () => {
    const nomeGigante =
      'Pedro de Alcântara Francisco Antônio João Carlos Xavier de Paula Miguel Rafael Joaquim José Gonzaga Pascoal Cipriano Serafim de Bragança e Bourbon'
    try {
      const pessoa = new NomePessoa(nomeGigante)
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_GRANDE)
    }
  })

  it('Deve lançar erro ao tentar criar nome sem sobrenome', () => {
    try {
      const pessoa = new NomePessoa('Fulano ')
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_SEM_SOBRENOME)
    }
  })

  it('Deve lançar erro ao tentar criar nome com caracteres especiais', () => {
    try {
      const pessoa = new NomePessoa('João @jooonnn')
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_CARACTERES_ESPECIAIS)
    }
  })

  it('Deve lançar erro ao tentar criar nome sem sobrenome', () => {
    try {
      const pessoa = new NomePessoa('Guilherme')
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_SEM_SOBRENOME)
    }
  })
})
