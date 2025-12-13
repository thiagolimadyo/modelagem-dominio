import { it, describe, expect } from 'vitest'
import Id from '../../../src/core/shared/Id'
import Erros from '../../../src/core/constants/Erros'

describe('Testes com Object Value Id', () => {
  it('Deve criar um novo Id válido', () => {
    const id = Id.novo
    expect(id.valor).toHaveLength(36)
    expect(id.novo).toBeTruthy()
  })

  it('Deve lançar erro ao tentar criar Id inválido', () => {
    expect(() => new Id('1234')).toThrowError(Erros.ID_INVALIDO)
  })

  it('Deve criar um novo Id a partir de um Id existente', () => {
    const id = Id.novo
    const novoId = new Id(id.valor)
    expect(novoId.valor).toHaveLength(36)
    expect(novoId.novo).toBeFalsy()
  })

  it('Deve comparar dois ids diferentes', () => {
    const id1 = Id.novo
    const id2 = Id.novo
    expect(id1.diferente(id2)).toBe(true)
    expect(id1.igual(id2)).toBeFalsy()
  })

  it('Deve comparar dois ids iguais', () => {
    const id1 = Id.novo
    const id2 = new Id(id1.valor)
    expect(id1.igual(id2)).toBe(true)
    expect(id1.diferente(id2)).toBeFalsy()
  })

  it('Deve comparar um id com undefined', () => {
    const id = Id.novo
    expect(id.igual(undefined as any)).toBeFalsy()
    expect(id.diferente(undefined as any)).toBeTruthy()
  })
})
