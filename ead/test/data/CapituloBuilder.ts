import Capitulo, { CapituloProps } from '@/curso/Capitulo'
import NomeCapitulo from './NomeCapitulo'
import { faker } from '@faker-js/faker'

import AulaBuilder from './AulaBuilder'
import Aula, { AulaProps } from '@/curso/Aula'

export default class CapituloBuilder {
  private constructor(private props: CapituloProps) {}

  static criar(qtdeAulas: number = 10) {
    return new CapituloBuilder({
      nome: NomeCapitulo.aleatorio,
      ordem: faker.number.int({ min: 1, max: 100 }),
      aulas: AulaBuilder.criarListaCom(qtdeAulas).map((a) => a.props),
    })
  }

  comId(id: string): CapituloBuilder {
    this.props.id = id
    return this
  }

  comNome(nome: string): CapituloBuilder {
    this.props.nome = nome
    return this
  }

  semNome(): CapituloBuilder {
    this.props.nome = undefined
    return this
  }

  comOrdem(ordem: number): CapituloBuilder {
    this.props.ordem = ordem
    return this
  }

  semOrdem(): CapituloBuilder {
    this.props.ordem = undefined
    return this
  }

  comAulas(aulas: (Aula | AulaProps)[]): CapituloBuilder {
    this.props.aulas = aulas.map((aula) =>
      aula instanceof Aula ? aula.props : aula
    )
    return this
  }

  semAulas(): CapituloBuilder {
    this.props.aulas = undefined
    return this
  }

  agora() {
    return new Capitulo(this.props)
  }
}
