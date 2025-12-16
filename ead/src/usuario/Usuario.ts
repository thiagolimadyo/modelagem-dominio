import Entidade, { EntidadeProps } from '@/shared/Entidade'
import NomePessoa from '@/shared/NomePessoa'

export interface UsuarioProps extends EntidadeProps {
  nome?: string
}

export default class Usuario extends Entidade<UsuarioProps> {
  readonly nome: NomePessoa

  constructor(props: UsuarioProps) {
    super(props)
    this.nome = new NomePessoa(props.nome)
  }
}
