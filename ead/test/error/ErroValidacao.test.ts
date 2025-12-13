import Erros from '@/constants/Erros'
import ErroValidacao from '@/error/ErroValidacao'
import { it, describe, expect } from 'vitest'

describe('Testes na classe ErroValidacao.ts', () => {
  it('Deve lançar um erro', () => {
    expect(() => ErroValidacao.lancar('Erro', 'Valor')).toThrowError('Erro')
  })

  it('Deve criar um erro com código e valor', () => {
    const erro = new ErroValidacao({
      codigo: Erros.EMAIL_INVALIDO,
      valor: 'x@',
    })

    expect(erro.codigo).toBe(Erros.EMAIL_INVALIDO)
    expect(erro.valor).toBe('x@')
  })

  it('Deve criar um erro com código, valor e extras', () => {
    const erro = ErroValidacao.novo(Erros.NOME_PEQUENO, 'X', { min: 6 })
    expect(erro.codigo).toBe(Erros.NOME_PEQUENO)
    expect(erro.valor).toBe('X')
    expect(erro.extras.min).toEqual(6)
  })

  it('Deve lançar um erro desconhecido', () => {
    const e1 = ErroValidacao.novo()
    const e2 = new ErroValidacao()
    expect(e1.codigo).toBe(Erros.DESCONHECIDO)
    expect(e2.codigo).toBe(Erros.DESCONHECIDO)
  })
})
