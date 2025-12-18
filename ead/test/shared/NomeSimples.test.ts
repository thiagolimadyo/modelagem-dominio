import Erros from '@/constants/Erros'
import NomeSimples from '@/shared/NomeSimples'
import { expect, it, describe } from 'vitest'

describe('Testes no Objeto de Valor NomeSimples', () => {
  it('Deve lançar erro para um nome simples vazio', () => {
    try {
      const nome = new NomeSimples('', 10, 20)
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_VAZIO)
      expect(erros[1].codigo).toBe(Erros.NOME_PEQUENO)
    }
  })

  it('Deve lançar erro para um nome simples em branco', () => {
    try {
      const nome = new NomeSimples(undefined as any, 10, 20)
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_VAZIO)
      expect(erros[1].codigo).toBe(Erros.NOME_PEQUENO)
    }
  })

  it('Deve lançar erro para um nome simples pequeno', () => {
    try {
      const nome = new NomeSimples('A', 10, 20)
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_PEQUENO)
    }
  })

  it('Deve lançar erro para um nome simples grande', () => {
    try {
      const nome = new NomeSimples('Nome Grande', 1, 2)
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_GRANDE)
    }
  })

  it('Deve permitir criar um nome simples válido', () => {
    const nome = new NomeSimples('Xuxa da Silva', 10, 20)
    expect(nome).toBeDefined()
    expect(nome.completo).toBe('Xuxa da Silva')
  })

  it('Deve retornar o nome capitalizado', () => {
    const nome = new NomeSimples(' joana dark da silva', 10, 20)
    expect(nome.pascalCase).toBe('Joana Dark Da Silva')
  })
})
