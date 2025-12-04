import { describe, it, expect } from 'vitest'
import Entidade, { EntidadeProps } from '../../../src/core/shared/Entidade'
import Id from '../../../src/core/shared/Id'
import NomePessoa from '../../../src/core/shared/NomePessoa'

export interface TesteProps extends EntidadeProps {
  nome?: string
  email?: string
}

export class Teste extends Entidade<TesteProps> {
  readonly nome?: NomePessoa
  readonly email?: string

  constructor(props: TesteProps) {
    super(props)
    this.nome = new NomePessoa(props.nome)
    this.email = props.email ?? ''
  }
}

describe('Testes para class abstrata Entidade', () => {
  it('Deve comparar duas entidades diferentes', () => {
    const p1 = new Teste({ nome: 'Joana Dark' })
    const p2 = new Teste({ nome: 'João do Pulo' })

    expect(p1.igual(p2)).toBe(false)
    expect(p1.diferente(p2)).toBe(true)
  })

  it('Deve comparar duas entidades com o mesmo ID e atributos diferentes', () => {
    const id = Id.novo
    const p1 = new Teste({
      id: id.valor,
      nome: 'Joana Dark',
      email: 'j.d@m.com',
    })
    const p2 = new Teste({
      id: id.valor,
      nome: 'João do Pulo',
      email: 'j.pulo@i.com',
    })

    expect(p1.nome?.completo !== p2.nome?.completo).toBe(true)
    expect(p1.email !== p2.email).toBe(true)
    expect(p1.igual(p2)).toBe(true)
    expect(p1.diferente(p2)).toBe(false)
  })

  it('Deve comparar entidade com undefined e null', () => {
    const p1 = new Teste({ nome: 'Joana Dark Azul e Preto' })

    expect(p1.igual(undefined as any)).toBeFalsy()
    expect(p1.igual(null as any)).toBeFalsy()
    expect(p1.diferente(undefined as any)).toBeTruthy()
    expect(p1.diferente(null as any)).toBeTruthy()
  })

  it('Deve clonar uma entidade com nome diferente', () => {
    const p1 = new Teste({
      nome: 'Maria Auxiliadora',
      email: 'maria.aux@terra.com.br',
    })
    const p2 = p1.clone({ nome: 'Maria Auxiliadora de Jesus' })

    expect(p1.igual(p2)).toBeTruthy()
    expect(p1.nome?.completo !== p2.nome?.completo).toBeTruthy()
    expect(p1.email === p2.email).toBeTruthy()
  })

  it('Deve clonar uma entidade com ID diferente', () => {
    const p1 = new Teste({
      nome: 'Maria Auxiliadora',
      email: 'maria.aux@terra.com.br',
    })

    const p2 = p1.clone({ id: Id.novo.valor })

    expect(p1.diferente(p2)).toBeTruthy()
    expect(p1.nome?.completo === p2.nome?.completo).toBeTruthy()
    expect(p1.email === p2.email).toBeTruthy()
  })
})
