import { it, describe, expect } from 'vitest'
import Pessoa from '../../../src/core/pessoa/Pessoa'
import Erros from '../../../src/core/constants/Erros'
import Id from '../../../src/core/shared/Id'
import PessoaBuilder from '../../../test/data/PessoaBuilder'

describe('Testes com a classe Pessoa', () => {
  it('Deve criar uma pessoa válida', () => {
    const nome = 'Joana Dark de Bragança'
    const pessoa = PessoaBuilder.criar().comNome(nome).semId().agora()

    expect(pessoa.nome.completo).toBe(nome)
    expect(pessoa.id.novo).toBeTruthy()
  })

  it('Deve lançar erro ao tentar criar uma pessoa com nome vazio', () => {
    const criarPessoaSemNome = () => PessoaBuilder.criar().semNome().agora()
    // expect(() => new Pessoa({ nome: '', cpf: '' })).toThrowError(
    //   Erros.NOME_VAZIO
    // )
    // expect(criarPessoaSemNome).toThrowError(Erros.NOME_VAZIO)
    expect(() => PessoaBuilder.criar().semNome().agora()).toThrowError(
      Erros.NOME_VAZIO
    )
  })

  it('Deve lançar erro ao tentar criar uma pessoa sem cpf', () => {
    expect(() => PessoaBuilder.criar().semCpf().agora()).toThrowError(
      Erros.CPF_INVALIDO
    )
  })

  it('Deve permitir clonar uma pessoa com nome alterado', () => {
    const pessoa = PessoaBuilder.criar().agora()
    const pessoaAlterada = pessoa.clone({ nome: 'Xuxa da Silva Santos' })

    expect(pessoaAlterada.id.valor).toBe(pessoa.id.valor)
    expect(pessoaAlterada.id.igual(pessoa.id)).toBe(true)
    expect(pessoaAlterada.cpf.valor).toBe(pessoa.cpf.valor)
    expect(pessoaAlterada.nome.completo).toBe('Xuxa da Silva Santos')
  })

  it('Deve permitir clonar uma pessoa com ID diferente', () => {
    const pessoa = PessoaBuilder.criar().agora()

    const novaPessoa = pessoa.clone({
      id: Id.novo.valor,
    })

    expect(pessoa.id.valor !== novaPessoa.id.valor).toBe(true)
    expect(pessoa.id.diferente(novaPessoa.id)).toBe(true)
    expect(pessoa.nome.completo).toBe(novaPessoa.nome.completo)
    expect(pessoa.cpf.valor).toBe(novaPessoa.cpf.valor)
  })
})
