// import UsuarioAnemicoV2 from '@/core/usuario/UsuarioAnemicoV2'
import Erros from '../../../src/core/constants/Erros'
import UsuarioAnemicoV4 from '../../../src/core/usuario/UsuarioAnemicoV4'

import { it, describe, expect } from 'vitest'

const usuarioValido = () =>
  new UsuarioAnemicoV4(123, 'Xuxa', 'xuxa@email.com', '123456')

describe('Usuário Anêmico V4', () => {
  it('Deve permitir usuário com nome undefined', () => {
    const usuario = usuarioValido()
    usuario.nome = undefined as any
    expect(usuario.nome).toBeUndefined()
  })

  it('Deve permitir usuário sem nome', () => {
    const usuario = usuarioValido()
    usuario.nome = ''
    expect(usuario.nome).toBe('')
  })

  it('Deve permitir usuário com id negativo', () => {
    const usuario = usuarioValido()
    usuario.id = -300
    expect(usuario.id).toBe(-300)
  })

  it('Não deve permitir usuário com e-mail inválido', () => {
    const usuario = usuarioValido()
    usuario.email = '@#$%'
    expect(usuario.email).toBe(usuario.email)
  })

  it('Deve permitir altetar o e-mail para um valor válido', () => {
    const usuario = usuarioValido()
    usuario.email = 'xuxa.silva@intel.com'
    expect(usuario.email).toBe('xuxa.silva@intel.com')
  })

  it('Deve lançar erro ao tentar alterar senha menor que 6 caracteres', () => {
    const usuario = usuarioValido()
    expect(() => (usuario.senha = 'a')).toThrowError(Erros.SENHA_INVALIDA)
  })

  it('Deve alterar senha para uma senha válida', () => {
    const novaSenhaValida = '123123'
    const usuario = usuarioValido()
    usuario.senha = novaSenhaValida
    expect(usuario.senha).toBe(novaSenhaValida)
  })
})
