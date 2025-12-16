import Email from '@/shared/Email'
import Entidade, { EntidadeProps } from '@/shared/Entidade'
import NomePessoa from '@/shared/NomePessoa'
import SenhaForte from '@/shared/SenhaForte'

export interface UsuarioProps extends EntidadeProps {
  nome?: string
  email?: string
  senha?: string
}

export default class Usuario extends Entidade<UsuarioProps> {
  readonly nome: NomePessoa
  readonly email: Email
  readonly senha?: SenhaForte

  constructor(props: UsuarioProps) {
    super(props)

    this.nome = new NomePessoa(props.nome)
    this.email = new Email(props.email)
    if (props.senha) this.senha = new SenhaForte(props.senha)
  }
}
