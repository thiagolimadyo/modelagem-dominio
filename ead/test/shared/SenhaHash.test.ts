import Erros from '@/constants/Erros'
import SenhaHash from '@/shared/SenhaHash'
import { it, describe, expect } from 'vitest'
const hashInvalido =
  '$2a$12$Ax9hT0MGsVN4/etvQ/r61uc6eFMDdKKs2X2mhZDh1dz47fcz1GUH'
const hashValido =
  '$2a$12$Ax9hT0MGsVN4/etvQ/r61uc6eFMDdKKs2X2mhZDh1dz47fcz1GUHe'

describe('Testes no Objeto de Valor SenhaHash', () => {
  it('Deve retornar false com um hash inválido', () => {
    expect(SenhaHash.isValida(hashInvalido)).toBeFalsy()
  })

  it('Deve retornrar true com um hash válido', () => {
    expect(SenhaHash.isValida(hashValido)).toBeTruthy()
  })

  it('Deve lançar erro ao criar instância com hash inválido', () => {
    expect(() => new SenhaHash(hashInvalido)).toThrowError(
      Erros.SENHA_HASH_INVALIDA
    )
  })

  it('Deve lançar erro ao criar instância com hash vazio', () => {
    expect(() => new SenhaHash()).toThrowError(Erros.SENHA_HASH_INVALIDA)
    expect(() => new SenhaHash('')).toThrowError(Erros.SENHA_HASH_INVALIDA)
  })

  it('Deve lançar erro com senha apenas de números', () => {
    expect(() => new SenhaHash('1234567890')).toThrowError(
      Erros.SENHA_HASH_INVALIDA
    )
  })

  it('Deve lançar erro com senha apenas de letras', () => {
    expect(() => new SenhaHash('AaBbCcDdEe')).toThrowError(
      Erros.SENHA_HASH_INVALIDA
    )
  })

  it('Deve lançar erro com senha apenas de caracteres especiais', () => {
    expect(() => new SenhaHash('@@##$$%%^^')).toThrowError(
      Erros.SENHA_HASH_INVALIDA
    )
  })

  it('Deve criar uma instância com senha hash válida', () => {
    const senha = new SenhaHash(hashValido)
    expect(SenhaHash.isValida(senha.valor!)).toBeTruthy()
  })

  it('Deve criar instâncias da mesma senha com rounds diferentes e hash válidas', () => {
    const hashs = [
      '$2a$12$5VNdACFbrnpop7EsE76rEuEBL8Gt8Hv4qE//WpmesyN6l6t3GbpcW',
      '$2a$13$mThTzWpeR1C8GNC7WWeQEOt0qK2SY0PGnwkuyz/eW38oSR3Tsj92C',
      '$2a$14$/dc1HnJQT7c.8858Hnxnd.3hAbm98dhcRxLhL2a0pJZbu6U.YWxGm',
      '$2a$16$H/JuzrEuxPIFEzkii.XzQOH/9zvubTgvu0OV.hMOuc1A4/knAWb/q',
    ]

    expect(new SenhaHash(hashs[0])).toBeDefined()
    expect(new SenhaHash(hashs[1])).toBeDefined()
    expect(new SenhaHash(hashs[2])).toBeDefined()
    expect(new SenhaHash(hashs[3])).toBeDefined()
  })
})
