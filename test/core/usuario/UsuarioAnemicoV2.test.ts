// import UsuarioAnemicoV2 from '@/core/usuario/UsuarioAnemicoV2'
import UsuarioAnemicoV2 from '../../../src/core/usuario/UsuarioAnemicoV2'

import { it, describe, expect } from 'vitest'

const usuarioValido = () =>
  new UsuarioAnemicoV2(123, 'Xuxa', 'xuxa@email.com', '123456')

describe('Usuário Anêmico V2', () => {
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

  it('Deve permitir usuário com e-mail inválido', () => {
    const usuario = usuarioValido()
    usuario.email = '@#$%'
    expect(usuario.email).toBe('@#$%')
  })

  it('Deve permitir usuário com senha inválida', () => {
    const usuario = usuarioValido()
    usuario.senha = 'a'
    expect(usuario.senha).toBe('a')
  })
})
