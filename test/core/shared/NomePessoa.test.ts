import { it, describe, expect } from 'vitest'
import NomePessoa from '../../../src/core/shared/NomePessoa'
import Erros from '../../../src/core/constants/Erros'

describe('Teste Object Value: NomePessoa.ts', () => {
  it('Deve lançar erro ao tentar criar nome vazio', () => {
    expect(() => new NomePessoa(' ')).toThrowError(Erros.NOME_VAZIO)
  })
})
