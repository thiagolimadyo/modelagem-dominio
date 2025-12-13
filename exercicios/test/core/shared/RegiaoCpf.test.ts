import { it, describe, expect } from 'vitest'
import RegiaoCpf from '@/core/shared/RegiaoCpf'

describe('Testes da VO RegiaoCpf', () => {
  it('Deve retornar uma RegiaoCpf por código', () => {
    const regiao = RegiaoCpf.porCodigo(0)

    expect(regiao.codigo).toBe(0)
    expect(regiao.estados[0]).toBe('RS')
  })

  it('Deve retornar uma RegiaoCpf por CPF', () => {
    const regiao = RegiaoCpf.porCpf('989.318.860-12')

    expect(regiao.codigo).toBe(0)
    expect(regiao.estados[0]).toBe('RS')
  })

  it('Deve comparar duas regiões como iguais', () => {
    const regiaoA = RegiaoCpf.porCpf('582.989.392-47')
    const regiaoB = RegiaoCpf.porCpf('196.609.592-90')

    expect(regiaoA.igual(regiaoB)).toBeTruthy()
    expect(regiaoA.diferente(regiaoB)).toBeFalsy()
  })

  it('Deve comparar duas regiões como diferentes', () => {
    const regiaoA = RegiaoCpf.porCpf('941.259.502-61')
    const regiaoB = RegiaoCpf.porCpf('132.440.465-50')

    expect(regiaoA.igual(regiaoB)).toBeFalsy()
    expect(regiaoA.diferente(regiaoB)).toBeTruthy()
  })

  it('Deve comparar uma região válida com outra undefined', () => {
    const regiao = RegiaoCpf.porCpf('132.440.465-50')

    expect(regiao.igual(undefined as any)).toBeFalsy()
    expect(regiao.diferente(undefined as any)).toBeTruthy()
  })

  it('Deve criar uma RegiaoCpf de SP', () => {
    const regiaoSP = RegiaoCpf.SP

    expect(regiaoSP.codigo).toBe(8)
    expect(regiaoSP.estados[0]).toBe('SP')
  })

  it('Deve criar uma RegiaoCpf de CE_MA_PI', () => {
    const regiao = RegiaoCpf.CE_MA_PI

    expect(regiao.codigo).toBe(3)
    expect(regiao.estados[0]).toBe('CE')
    expect(regiao.estados[1]).toBe('MA')
    expect(regiao.estados[2]).toBe('PI')
  })
})
