import { describe, it, expect } from 'vitest'

import Entidade, { EntidadeProps } from '@/shared/Entidade'
import NomePessoa from '@/shared/NomePessoa'

export interface TesteProps extends EntidadeProps {
  nome?: string
  idade?: number
}

export default class Pessoa extends Entidade<TesteProps> {
  readonly nome?: NomePessoa
  readonly idade?: number

  constructor(props: TesteProps) {
    super(props)
    this.nome = new NomePessoa(props.nome)
    this.idade = props.idade
  }
}

const uuidValido = '0a34ddfc-fc38-422f-9464-fc57204f6037'

describe('Testes com a classe base Abstrada Entidade', () => {
  it('Deve comparar duas entidades diferentes', () => {
    const pessoa1 = new Pessoa({ idade: 20, nome: 'Xuxa da Silva' })
    const pessoa2 = new Pessoa({ idade: 40, nome: 'Joana Dark' })
    expect(pessoa1.igual(pessoa2)).toBeFalsy()
    expect(pessoa1.diferente(pessoa2)).toBeTruthy()
  })

  it('Deve comparar duas entidades com o mesmo ID e atributos diferentes', () => {
    const pessoa1 = new Pessoa({
      id: uuidValido,
      nome: 'Xuxa da Silva',
      idade: 40,
    })
    const pessoa2 = new Pessoa({
      id: uuidValido,
      nome: 'Joana Dark',
      idade: 44,
    })
    expect(pessoa1.igual(pessoa2)).toBeTruthy()
    expect(pessoa1.diferente(pessoa2)).toBeFalsy()
  })

  it('Deve comparar entidade com undefined e null', () => {
    const pessoa = new Pessoa({ nome: 'Xuxa da Silva', idade: 40 })
    expect(pessoa.igual(undefined as any)).toBeFalsy()
    expect(pessoa.igual(null as any)).toBeFalsy()
    expect(pessoa.diferente(undefined as any)).toBeTruthy()
    expect(pessoa.diferente(null as any)).toBeTruthy()
  })

  it('Deve clonar uma entidade com nome diferente e mesmo Id', () => {
    const pessoa1 = new Pessoa({ nome: 'Xuxa da Silva', idade: 40 })
    const pessoa2 = pessoa1.clone({ nome: 'Polidóro da Silva' })
    expect(pessoa1.nome !== pessoa2.nome).toBeTruthy()
    expect(pessoa1.igual(pessoa2)).toBeTruthy()
  })

  it('Deve clonar uma entidade com ID diferente', () => {
    const pessoa1 = new Pessoa({ nome: 'Xuxa da Silva', idade: 40 })
    const pessoa2 = pessoa1.clone({ id: uuidValido })

    console.log(pessoa1.nome, pessoa2.nome)
    expect(pessoa1.diferente(pessoa2)).toBeTruthy()
    expect(pessoa1?.nome?.completo === pessoa2?.nome?.completo).toBeTruthy()
  })
})
