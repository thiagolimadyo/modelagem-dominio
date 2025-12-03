import { it, describe, expect } from 'vitest'
import Pessoa from '../../../src/core/pessoa/Pessoa'
import Erros from '../../../src/core/constants/Erros'
import Id from '../../../src/core/shared/Id'

describe('Testes com a classe Pessoa', () => {
  it('Deve criar uma pessoa válida', () => {
    const pessoa = new Pessoa({
      nome: 'Joana Dark de Bragança',
      cpf: '280.012.389-38',
    })

    expect(pessoa.nome.completo).toBe('Joana Dark de Bragança')
    expect(pessoa.id.novo).toBeTruthy()
  })

  it('Deve lançar erro ao tentar criar uma pessoa com nome vazio', () => {
    expect(() => new Pessoa({ nome: '', cpf: '' })).toThrowError(
      Erros.NOME_VAZIO
    )
  })

  it('Deve permitir clonar uma pessoa com nome alterado', () => {
    const pessoa = new Pessoa({
      nome: 'Xuxa da Sila',
      cpf: '280.012.389-38',
    })

    const pessoaAlterada = pessoa.clone({ nome: 'Xuxa da Silva Santos' })

    expect(pessoaAlterada.id.valor).toBe(pessoa.id.valor)
    expect(pessoaAlterada.id.igual(pessoa.id)).toBe(true)
    expect(pessoaAlterada.cpf.valor).toBe(pessoa.cpf.valor)
    expect(pessoaAlterada.nome.completo).toBe('Xuxa da Silva Santos')
  })

  it('Deve permitir clonar uma pessoa com ID diferente', () => {
    const pessoa = new Pessoa({
      nome: 'Xuxa da Sila',
      cpf: '280.012.389-38',
    })

    const novaPessoa = pessoa.clone({
      id: Id.novo.valor,
    })
    expect(pessoa.id.valor !== novaPessoa.id.valor).toBe(true)
    expect(pessoa.id.diferente(novaPessoa.id)).toBe(true)
    expect(pessoa.nome.completo).toBe(novaPessoa.nome.completo)
    expect(pessoa.cpf.valor).toBe(novaPessoa.cpf.valor)
  })
})
