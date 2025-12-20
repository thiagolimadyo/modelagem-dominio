import Erros from '@/constants/Erros'
import Ordem from '@/shared/Ordem'
import { it, describe, expect } from 'vitest'

describe('Testes no Objeto de Valor Ordem.ts', () => {
  it('Deve criar ordem com valor 1', () => {
    const ordem = new Ordem()
    expect(ordem.valor === 1).toBeTruthy()
  })

  it('Deve criar uma ordem com valor 1000', () => {
    const ordem = new Ordem(1000)
    expect(ordem.valor).toBe(1000)
  })

  it('Deve lançar erro para valores inválidos', () => {
    expect(() => new Ordem(0)).toThrowError(Erros.ORDEM_INVALIDA)
    expect(() => new Ordem(-10)).toThrowError(Erros.ORDEM_INVALIDA)
    expect(() => new Ordem(NaN)).toThrowError(Erros.ORDEM_INVALIDA)
    expect(() => new Ordem(null as any)).toThrowError(Erros.ORDEM_INVALIDA)
    expect(() => new Ordem('' as any)).toThrowError(Erros.ORDEM_INVALIDA)
    expect(() => new Ordem(-0)).toThrowError(Erros.ORDEM_INVALIDA)
  })

  it('Deve comparar duas ordens como iguais', () => {
    const o1 = new Ordem(1)
    const o2 = new Ordem(1)
    expect(o1.igual(o2)).toBeTruthy()
    expect(o1.diferente(o2)).toBeFalsy()
  })

  it('Deve comparar duas ordens como diferentes', () => {
    const o1 = new Ordem(1)
    const o2 = new Ordem(2)
    expect(o1.diferente(o2)).toBeTruthy()
    expect(o1.igual(o2)).toBeFalsy()
  })

  it('Deve comparar duas ordens para ordenação', () => {
    const ordem1 = new Ordem(1)
    const ordem2 = new Ordem(2)
    const ordem3 = new Ordem(2)
    expect(ordem1.comparar(ordem2) === -1).toBeTruthy()
    expect(ordem2.comparar(ordem3) === -0).toBeTruthy()
    expect(ordem2.comparar(ordem1) === 1).toBeTruthy()
  })

  it('Deve ordenar um array com 3 objetos', () => {
    const itens = [
      { ordem: new Ordem(1) },
      { ordem: new Ordem(2) },
      { ordem: new Ordem(3) },
    ]
    itens.sort(Ordem.ordenar)
    expect(itens[0].ordem.valor === 1)
    expect(itens[1].ordem.valor === 2)
    expect(itens[2].ordem.valor === 3)
  })
})
