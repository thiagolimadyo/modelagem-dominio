import Usuario, { UsuarioProps } from '@/usuario/Usuario'
import { Faker, faker, base, pt_BR } from '@faker-js/faker'

const fakerBR = new Faker({
  locale: [pt_BR, base],
})

export default class UsuarioBuilder {
  private constructor(private props: UsuarioProps) {}

  static criar(): UsuarioBuilder {
    return new UsuarioBuilder({
      nome: fakerBR.person.fullName(),
      email: fakerBR.internet.email(),
      senha: fakerBR.internet.password({
        length: 60,
        pattern: /[A-Za-z0-9\.\/]/,
        prefix: '$2a$12$',
      }),
    })
  }

  agora(): Usuario {
    return new Usuario(this.props)
  }

  comNome(nome: string) {
    this.props.nome = nome
    return this
  }

  semNome() {
    this.props.nome = undefined
    return this
  }

  comEmail(email: string) {
    this.props.email = email
    return this
  }

  semEmail() {
    this.props.email = undefined
    return this
  }

  comSenha(senha: string) {
    this.props.senha = senha
    return this
  }

  semSenha() {
    this.props.senha = undefined
    return this
  }

  comId(id: string) {
    this.props.id = id
    return this
  }

  semId() {
    this.props.id = undefined
    return this
  }
}
