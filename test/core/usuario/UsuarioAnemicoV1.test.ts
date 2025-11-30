// import UsuarioAnemicoV1 from '@/core/usuario/UsuarioAnemicoV1'
import UsuarioAnemicoV1 from '../../../src/core/usuario/UsuarioAnemicoV1'
import { it, describe, expect } from 'vitest'

const usuarioValido: UsuarioAnemicoV1 = {
  id: 1,
  nome: 'Xuxa',
  email: 'xuxa@email.com',
  senha: '123456',
}

describe('Usuario Anêmico V1', () => {
  it('Deve permitir usuário com nome undefined', () => {
    const usuario = { ...usuarioValido, nome: undefined }
    expect(usuario.nome).toBeUndefined()
  })

  it('Deve permitir usuário com id negativo', () => {
    const usuario = { ...usuarioValido, id: -300 }
    expect(usuario.id < 0).toBeTruthy()
  })

  it('Deve permitir usuário sem nome', () => {
    const usuario = { ...usuarioValido, nome: '' }
    expect(usuario.nome).toBe('')
  })

  it('Deve permitir usuário com e-mail inválido', () => {
    const usuario = { ...usuarioValido, email: '@#$%' }
    expect(usuario.email).toBe('@#$%')
  })

  it('Deve permitir usuário com senha inválida', () => {
    const usuario = { ...usuarioValido, senha: 'a' }
    expect(usuario.senha).toBe('a')
  })
})
