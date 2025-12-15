import Validador from '@/utils/Validador'
import { it, describe, expect } from 'vitest'

const msgErro = 'Texto Inválido'

describe('Testes do Validador.ts', () => {
  it('Deve retornar null com texto não nulo', () => {
    const erro = Validador.naoNulo('Bom dia', 'Texto Inválido')
    expect(erro).toBeNull()
  })

  it('Deve retornar erro com texto nulo', () => {
    const erro = Validador.naoNulo(null, msgErro)
    expect(erro?.codigo).toBe(msgErro)
  })

  it('Deve retornar null com texto não vazio', () => {
    expect(Validador.naoVazio('Bom dia', 'Texto Inválido')).toBeNull()
  })

  it('Deve retornar erro com texto vazio', () => {
    const erro = Validador.naoVazio('   ', 'Texto Inválido')
    expect(erro?.codigo).toBe('Texto Inválido')
  })

  it('Deve retornar erro com texto null', () => {
    const erro = Validador.naoVazio(null, msgErro)
    expect(erro?.codigo).toBe(msgErro)
  })

  it('Deve retornar erro com texto undefined', () => {
    const erro = Validador.naoVazio(undefined, msgErro)
    expect(erro?.codigo).toBe(msgErro)
  })

  it('Deve retornar null com texto menor que tamanho máximo permitido', () => {
    expect(Validador.tamanhoMenorQue('Xuxa', 5, msgErro)).toBeNull()
  })

  it('Deve retornar erro com texto maior que o tamanho máximo permitido', () => {
    const erro = Validador.tamanhoMenorQue('Xuxa da Silva', 5, msgErro)
    expect(erro?.codigo).toBe(msgErro)
  })

  it('Deve retornar null com texto maior que tamanho mínimo permitido', () => {
    const erro = Validador.tamanhoMaiorQue('Xuxa da Silva', 6, msgErro)
    expect(erro).toBeNull()
  })

  it('Deve retornar erro com texto menor que tamanho mínimo permitido', () => {
    const erro = Validador.tamanhoMaiorQue('Xuxa', 6, msgErro)
    expect(erro?.codigo).toBe(msgErro)
  })

  it('Deve validar via regex que só aceita numeros', () => {
    expect(Validador.regex('12345678900', /\d{11}/g, msgErro)).toBeNull()
  })

  it('Deve retornar erro para regex que só aceita numeros', () => {
    const msgErro = 'Texto Inválido'
    const erro = Validador.regex('1A345678900', /\d{11}/g, msgErro)
    expect(erro?.codigo).toBe(msgErro)
  })

  it('Deve combinar os erros', () => {
    const erros = Validador.combinar(
      Validador.naoVazio('Aqui tem caracteres', msgErro),
      Validador.naoVazio('  ', msgErro),
      Validador.naoVazio('   ', msgErro),
      Validador.naoVazio('    ', msgErro),
      Validador.naoVazio('     ', msgErro)
    )

    expect(erros?.map((erro) => erro.codigo).join(', ')).toBe(
      `${msgErro}, ${msgErro}, ${msgErro}, ${msgErro}`
    )
  })

  it('Deve combinar sem erros', () => {
    const erros = Validador.combinar(
      Validador.naoVazio('Aqui tem caracteres', msgErro),
      Validador.naoVazio('Aqui tem caracteres', msgErro),
      Validador.naoVazio('Aqui tem caracteres', msgErro),
      Validador.naoVazio('Aqui tem caracteres', msgErro),
      Validador.naoVazio('Aqui tem caracteres', msgErro)
    )
    expect(erros).toBeNull()
  })
})
