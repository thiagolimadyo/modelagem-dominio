import Erros from '@/constants/Erros'
import Duracao from '@/shared/Duracao'
import { it, expect, describe } from 'vitest'

describe('Testes no Objeto de Valor Duracao.ts', () => {
  it('Deve criar uma Duração vazia', () => {
    expect(new Duracao()).toBeDefined()
    expect(new Duracao()).toBeDefined()
    expect(new Duracao().zerada).toBeTruthy()
    expect(new Duracao().hms).toBe('00s')
    expect(new Duracao().hm).toBe('00m')
  })

  it('Deve criar uma Duração zerada', () => {
    expect(new Duracao(0)).toBeDefined()
    expect(new Duracao(0)).toBeDefined()
    expect(new Duracao(0).zerada).toBeTruthy()
    expect(new Duracao(0).hms).toBe('00s')
    expect(new Duracao(0).hm).toBe('00m')
  })

  it('Deve formatar em horas e minutos', () => {
    expect(new Duracao(3600).hm).toBe('01h 00m')
    expect(new Duracao(3660).hm).toBe('01h 01m')
    expect(new Duracao(180).hm).toBe('03m')
  })

  it('Deve formatar em horas, minutos e segundos', () => {
    expect(new Duracao(3601).hms).toBe('01h 00m 01s')
    expect(new Duracao(3660).hms).toBe('01h 01m 00s')
    expect(new Duracao(180).hms).toBe('03m 00s')
    expect(new Duracao(58).hms).toBe('58s')
  })

  it('Deve somar duas Durações', () => {
    const d1 = new Duracao(3600)
    const d2 = new Duracao(180)
    expect(d1.somar(d2).segundos).toBe(3780)
    expect(d1.somar(d2).hm).toBe('01h 03m')
  })

  it('Deve comparar duas Durações iguais', () => {
    const d1 = new Duracao(3600)
    const d2 = new Duracao(3600)
    expect(d1.igual(d2)).toBeTruthy()
    expect(d1.diferente(d2)).toBeFalsy()
  })

  it('Deve comparar duas Durações diferentes', () => {
    const d1 = new Duracao(3600)
    const d2 = new Duracao(3601)
    expect(d1.diferente(d2)).toBeTruthy()
    expect(d1.igual(d2)).toBeFalsy()
  })

  it('Deve lançar erro para Duração com valores inválidos', () => {
    expect(() => new Duracao(-10)).toThrowError(Erros.DURACAO_INVALIDA)
    expect(() => new Duracao(NaN)).toThrowError(Erros.DURACAO_INVALIDA)
    expect(() => new Duracao(Infinity)).toThrowError(Erros.DURACAO_INVALIDA)
    expect(() => new Duracao(-Infinity)).toThrowError(Erros.DURACAO_INVALIDA)
    expect(() => new Duracao(null as any)).toThrowError(Erros.DURACAO_INVALIDA)
  })
})
