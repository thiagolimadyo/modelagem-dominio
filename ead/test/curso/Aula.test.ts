import Erros from '@/constants/Erros'
import Aula from '@/curso/Aula'
import { it, describe, expect } from 'vitest'

const nome = 'Arquitetura Limpa'
const duracao = 200
const ordem = 1
const videoUrl = 'https://www.formacaodev.com.br/arquitetura-limpa-aula-1'

describe('Testes na entidade Aula.ts', () => {
  it('Deve criar uma Aula válida', () => {
    const aula = new Aula({
      nome,
      duracao,
      ordem,
      videoUrl,
    })

    console.log(aula.toJson)
  })

  it('Deve lançar erro ao tentar criar uma Aula com duração zerada', () => {
    expect(() => new Aula({ nome, duracao: 0, ordem, videoUrl })).toThrowError(
      Erros.AULA_DURACAO_ZERADA
    )
  })

  it('Deve criar uma aula válida sem passar a ordem', () => {
    const aula = new Aula({
      nome,
      duracao,
      videoUrl,
    })
    console.log(aula)
  })
})
