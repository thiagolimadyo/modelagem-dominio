import { it, describe, expect } from 'vitest'
import Cpf from '../../../src/core/shared/Cpf'
import Erros from '../../../src/core/constants/Erros'

describe('Testes do VO Cpf', () => {
  it('Deve lançar erro ao receber CPF inválido', () => {
    expect(() => new Cpf('123123123')).toThrowError(Erros.CPF_INVALIDO)
  })

  it('Deve lançar erro ao receber um CPF com DV inválido', () => {
    // cpf correto = 28001238938
    expect(() => new Cpf('28001238931')).toThrowError(Erros.CPF_DV_INVALIDO)
    expect(() => new Cpf('28001238918')).toThrowError(Erros.CPF_DV_INVALIDO)
    expect(() => new Cpf('18001238938')).toThrowError(Erros.CPF_DV_INVALIDO)
  })

  it('Deve retornar apenas os 2 dígitos verificadores', () => {
    expect(new Cpf('28001238938').digitoVerificador).toBe('38')
  })

  it('Deve retornar o CPF formato com . e -', () => {
    expect(new Cpf('28001238938').formatado).toBe('280.012.389-38')
  })
})
