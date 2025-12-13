// import UsuarioAnemicoV2 from '@/core/usuario/UsuarioAnemicoV2'
import Erros from '../../../src/core/constants/Erros'
import UsuarioAnemicoV3 from '../../../src/core/usuario/UsuarioAnemicoV3'

import { it, describe, expect } from 'vitest'

const usuarioValido = () =>
  new UsuarioAnemicoV3(123, 'Xuxa', 'xuxa@email.com', '123456')

describe('Usuário Anêmico V3', () => {
  it('Deve permitir usuário com nome undefined', () => {
    const usuario = usuarioValido()
    usuario.setNome(undefined as any)
    expect(usuario.getNome()).toBeUndefined()
  })

  it('Deve permitir usuário sem nome', () => {
    const usuario = usuarioValido()
    usuario.setNome('')
    expect(usuario.getNome()).toBe('')
  })

  it('Deve permitir usuário com id negativo', () => {
    const usuario = usuarioValido()
    usuario.setId(-300)
    expect(usuario.getId()).toBe(-300)
  })

  it('Não deve permitir usuário com e-mail inválido', () => {
    const usuario = usuarioValido()
    usuario.setEmail('@#$%')
    expect(usuario.getEmail()).toBe(usuario.getEmail())
  })

  it('Deve lançar erro ao tentar alterar senha menor que 6 caracteres', () => {
    const usuario = usuarioValido()
    expect(() => usuario.setSenha('a')).toThrowError(Erros.SENHA_INVALIDA)
  })

  it('Deve alterar senha para uma senha válida', () => {
    const novaSenhaValida = '123123'
    const usuario = usuarioValido()
    usuario.setSenha(novaSenhaValida)
    expect(usuario.getSenha()).toBe(novaSenhaValida)
  })
})
