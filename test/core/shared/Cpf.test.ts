import { it, describe, expect } from 'vitest'
import Cpf from '../../../src/core/shared/Cpf'
import Erros from '../../../src/core/constants/Erros'

const cpfValido = '280.012.389-38'
const cpfValidoSemFormatacao = '28001238938'

describe('Testes do VO Cpf', () => {
  it('Deve retornar CPF inválido (false) para string vazia', () => {
    expect(Cpf.isValido('')).toBeFalsy()
  })

  it('Deve retornar CPF inválido (false) para string incompleta', () => {
    expect(Cpf.isValido('280')).toBeFalsy()
    expect(Cpf.isValido('280012')).toBeFalsy()
    expect(Cpf.isValido('280.012.389')).toBeFalsy()
    expect(Cpf.isValido('280.012.389-3')).toBeFalsy()
  })

  it('Deve lançar erro ao cadastrar cpf inválido', () => {
    expect(() => new Cpf('280.012.389-37')).toThrowError(Erros.CPF_INVALIDO)
  })

  it('Deve aceitar um CPF válido', () => {
    expect(new Cpf('280.012.389-38').valor).toBe('28001238938')
    expect(new Cpf('553.548.980-80').valor).toBe('55354898080')
    expect(new Cpf('262.103.782-85').valor).toBe('26210378285')
    expect(new Cpf('545.505.038-90').valor).toBe('54550503890')
  })

  it('Deve retornar o CPF formatado', () => {
    const cpf = new Cpf(cpfValidoSemFormatacao)
    expect(cpf.formatado).toBe(cpfValido)
  })

  it('Deve retornar os 2 dígitos verificadores', () => {
    const cpf = new Cpf(cpfValido)
    console.log(cpf.formatado, cpf.digitoVerificador)
    expect(cpf.digitoVerificador).toBe(cpfValido.substring(12))
  })
})
