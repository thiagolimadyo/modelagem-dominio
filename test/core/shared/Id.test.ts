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
})
