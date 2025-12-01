import { it, describe, expect } from 'vitest'
import Pessoa from '../../../src/core/pessoa/Pessoa'
import Erros from '../../../src/core/constants/Erros'

describe('Testes com a classe Pessoa', () => {
  it('Deve criar uma pessoa válida', () => {
    const nome = 'Joana Dark de Bragança'
    const p1 = new Pessoa('Joana Dark de Bragança')
    expect(p1.nome.completo).toBe(nome)
    expect(p1.id.novo).toBeTruthy()
  })

  it('Deve lançar erro ao tentar criar uma pessoa com nome vazio', () => {
    expect(() => new Pessoa('')).toThrowError(Erros.NOME_VAZIO)
  })
})
