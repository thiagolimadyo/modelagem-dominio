import Erros from '@/constants/Erros'
import SenhaForte from '@/shared/SenhaForte'
import { it, describe, expect } from 'vitest'

describe('Testes no Objeto de Valor SenhaForte', () => {
  it('Deve lançar erro com senha apenas de números', () => {
    expect(() => new SenhaForte('1234567890')).toThrowError(Erros.SENHA_FRACA)
  })

  it('Deve lançar erro com senha apenas de letras', () => {
    expect(() => new SenhaForte('AaBbCcDdEe')).toThrowError(Erros.SENHA_FRACA)
  })

  it('Deve lançar erro com senha apenas de caracteres especiais', () => {
    expect(() => new SenhaForte('@@##$$%%^^')).toThrowError(Erros.SENHA_FRACA)
  })

  it('Deve lançar erro com senha menor de 8 caracteres', () => {
    expect(() => new SenhaForte('Aab10(*')).toThrowError(Erros.SENHA_FRACA)
  })

  it('Deve lançar erro com senha em branco', () => {
    expect(() => new SenhaForte()).toThrowError(Erros.SENHA_FRACA)
    expect(() => new SenhaForte('')).toThrowError(Erros.SENHA_FRACA)
  })

  it('Deve criar uma senha forte', () => {
    const senhaForte = new SenhaForte('Ab10()-*$%')
    expect(SenhaForte.isValid(senhaForte.valor ?? '')).toBeTruthy()
  })
})
