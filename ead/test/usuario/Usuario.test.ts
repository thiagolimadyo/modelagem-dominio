import { it, describe, expect } from 'vitest'
import UsuarioBuilder from '../data/UsuarioBuilder'
import Erros from '@/constants/Erros'

describe('Testes na Entidade Usuario', () => {
  it('Deve criar um usuário válido', () => {
    const nome = 'Xuxa da Silva'
    const email = 'xuxa.dasilva@microsoft.com'
    const usuario = UsuarioBuilder.criar().comNome(nome).comEmail(email).agora()
    expect(usuario.nome.completo).toBe(nome)
    expect(usuario.email.valor).toBe(email)
    expect(usuario.senha).toBeDefined()
  })

  it('Deve criar um usuário sem senha', () => {
    const usuario = UsuarioBuilder.criar().semSenha().agora()
    expect(usuario.senha).toBeUndefined()
  })

  it('Deve lançar erro quando o nome não for informado', () => {
    try {
      const usuario = UsuarioBuilder.criar().semNome().agora()
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_VAZIO)
      expect(erros[1].codigo).toBe(Erros.NOME_PEQUENO)
      expect(erros[2].codigo).toBe(Erros.NOME_SEM_SOBRENOME)
    }
  })

  it('Deve lançar erro quando o sobrenome não for informado', () => {
    try {
      const usuario = UsuarioBuilder.criar().comNome('Xuxa').agora()
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_PEQUENO)
      expect(erros[1].codigo).toBe(Erros.NOME_SEM_SOBRENOME)
    }
  })

  it('Deve lançar erro para usuário sem e-mail', () => {
    expect(() => UsuarioBuilder.criar().semEmail().agora()).toThrowError(
      Erros.EMAIL_INVALIDO
    )
  })
})
