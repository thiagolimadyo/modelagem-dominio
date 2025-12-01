import { it, describe, expect } from 'vitest'
import Cpf from '../../../src/core/shared/Cpf'
import Erros from '../../../src/core/constants/Erros'

describe('Testes do VO Cpf', () => {
  it('Deve lançar erro ao receber CPF inválido', () => {
    expect(() => new Cpf('123123123')).toThrowError(Erros.CPF_INVALIDO)
  })

  it('Deve aceitar um CPF válido', () => {
    const cpf = new Cpf('28001238938')
    cpf.digitoVerificador
  })
})
