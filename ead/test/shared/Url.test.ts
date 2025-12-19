import Erros from '@/constants/Erros'
import Url from '@/shared/Url'
import { it, describe, expect } from 'vitest'

const urlValida = '   https://www.google.com/search?p1=Linux&p2=Brasil  '

describe('Testes no Objeto de Valor Url.ts', () => {
  it('Deve retornar o domínio completo da URL', () => {
    const url = new Url(urlValida)
    expect(url.dominio).toBe('www.google.com')
  })

  it('Deve retornar o protocolo da URL', () => {
    const url = new Url(urlValida)
    expect(url.protocolo).toBe('https')
  })

  it('Deve retornar o caminho da URL', () => {
    const url = new Url(urlValida)
    expect(url.caminho).toBe('/search')
  })

  it('Deve retornar os parâmetros da URL', () => {
    const url = new Url(urlValida)
    expect(url.parametros).toEqual({ p1: 'Linux', p2: 'Brasil' })
    expect(url.parametros.p1).toBe('Linux')
    expect(url.parametros.p2).toBe('Brasil')
  })

  it('Deve lançar erro com URL inválida', () => {
    expect(() => new Url()).toThrowError(Erros.URL_INVALIDA)
    expect(() => new Url('')).toThrowError(Erros.URL_INVALIDA)
    expect(() => new Url('www.google.com')).toThrowError(Erros.URL_INVALIDA)
    expect(() => new Url('https//www.google.com')).toThrowError(
      Erros.URL_INVALIDA
    )
  })
})
