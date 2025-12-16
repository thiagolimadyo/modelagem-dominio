import Erros from '@/constants/Erros'
import Email from '@/shared/Email'
import { it, describe, expect } from 'vitest'

const email = new Email('xuxa.dasilva@intel.com')

describe('Testes no Objeto de Valor Email', () => {
  it('Deve criar um e-mail válido', () => {
    expect(Email.isValido(email.valor)).toBeTruthy()
  })

  it('Deve retornar o nome do usuário', () => {
    expect(email.usuario).toBe('xuxa.dasilva')
  })

  it('Deve retornar o domínio do email', () => {
    expect(email.dominio).toBe('intel.com')
  })

  it('Deve retornar erro de e-mail inválido', () => {
    expect(() => new Email()).toThrowError(Erros.EMAIL_INVALIDO)
    expect(() => new Email('')).toThrowError(Erros.EMAIL_INVALIDO)
    expect(() => new Email('xuxa')).toThrowError(Erros.EMAIL_INVALIDO)
    expect(() => new Email('xuxa@micron')).toThrowError(Erros.EMAIL_INVALIDO)
  })

  it('Deve retornar erro com e-mail em branco', () => {
    expect(() => new Email()).toThrowError(Erros.EMAIL_INVALIDO)
  })
})
