import Erros from '@/constants/Erros'
import Id from '@/shared/Id'
import { it, describe, expect } from 'vitest'

const idValido = '99e6761b-f92f-49fd-b81c-6f26fd5fc5e7'
const idInvalido = '9e6761b-f92f-49fd-b81c-6f26fd5fc5e7'

describe('Testes do Objeto de Valor Id', () => {
  it('Deve permitir criar um novo Id válido', () => {
    const id = Id.novo
    expect(id.novo).toBeTruthy()
    expect(id.valor).toHaveLength(36)
  })

  it('Deve recuperar um Id existente', () => {
    const id = new Id(idValido)
    expect(id.valor).toEqual(idValido)
  })

  it('Deve comprar dois ids', () => {
    const id1 = new Id(idValido)
    const id2 = Id.novo

    expect(id1.igual(id2)).toBeFalsy()
    expect(id1.diferente(id2)).toBeTruthy()
  })

  it('Deve comprar um id com undefined', () => {
    const id = Id.novo
    expect(id.igual(undefined as any)).toBeFalsy()
    expect(id.diferente(undefined as any)).toBeTruthy()
  })

  it('Deve receber um id inválido e retornar erro', () => {
    expect(() => new Id(idInvalido)).toThrowError(Erros.ID_INVALIDO)
  })
})
