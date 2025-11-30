import { it, describe, expect } from 'vitest'
import Validador from '../../../src/core/utils/Validador'

describe('Testes Validador.ts', () => {
  it('Deve retornar null ao validar texto não nulo', () => {
    const erro = Validador.naoNulo('Bom dia.', 'Valor Inválido')
    expect(erro).toBeNull()
  })

  it('Deve retornar erro ao validar valor nulo', () => {
    const msgErro = 'Valor Inválido'
    const erro = Validador.naoNulo(null, msgErro)
    expect(erro).toBe(msgErro)
  })

  it('Deve retornar null ao validar valor não vazio', () => {
    const erro = Validador.naoVazia('Bom dia', 'Valor Inválido')
    expect(erro).toBeNull()
  })

  it('Deve retornar erro ao validar valor vazio', () => {
    const msgErro = 'Valor Inválido'
    const erro = Validador.naoVazia('  ', msgErro)

    expect(erro).toBe(msgErro)
  })

  it('Deve retornar erro ao validar valor null', () => {
    const msgErro = 'Valor Inválido'
    const erro = Validador.naoVazia(null, msgErro)

    expect(erro).toBe(msgErro)
  })

  it('Deve retornar erro ao validar valor undefined', () => {
    const msgErro = 'Valor Inválido'
    const erro = Validador.naoVazia(undefined, msgErro)

    expect(erro).toBe(msgErro)
  })

  it('Deve retornar null ao validar texto menor que o máximo permitido', () => {
    const erro = Validador.tamanhoMenorQue('Thiago Lima', 50, 'Muito grande')
    expect(erro).toBeNull()
  })

  it('Deve retornar erro ao validar texto maior que o máximo permitido', () => {
    const msgErro = 'Muito grande'
    const erro = Validador.tamanhoMenorQue('Thiago Lima', 5, msgErro)
    expect(erro).toBe(msgErro)
  })

  it('Deve combinar vários erros', () => {
    const erros = Validador.combinar(
      Validador.naoVazia('', 'erro1'),
      Validador.naoVazia('Bom dia', 'erro2'),
      Validador.naoVazia('', 'erro3'),
      Validador.naoVazia('', 'erro4'),
      Validador.naoVazia('', 'erro5')
    )
    expect(erros?.join(', ')).toBe('erro1, erro3, erro4, erro5')
  })

  it('Deve combinar sem erros', () => {
    const erros = Validador.combinar(
      Validador.naoVazia('Bom dia', 'erro1'),
      Validador.naoVazia('Boa tarde', 'erro2'),
      Validador.naoVazia('Boa noite', 'erro3')
    )
    expect(erros).toBeNull()
  })
})
