import Id from './Id'

export interface EntidadeProps {
  id?: string
}

export default abstract class Entidade<Props extends EntidadeProps> {
  readonly id: Id
  readonly props: Props

  constructor(props: Props) {
    this.id = new Id(props.id)
    this.props = { ...props, id: this.id.valor }
  }

  igual(outraEntidade: Entidade<Props>): boolean {
    return this.id.igual(outraEntidade?.id)
  }

  diferente(outraEntidade: Entidade<Props>): boolean {
    return this.id.diferente(outraEntidade?.id)
  }

  clone(novasProps?: Props): this {
    return new (this.constructor as any)({ ...this.props, ...novasProps })
  }
}
