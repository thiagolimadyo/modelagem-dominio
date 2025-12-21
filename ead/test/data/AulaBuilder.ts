import Aula, { AulaProps } from '@/curso/Aula'
import NomeAula from './NomeAula'
import { faker } from '@faker-js/faker'

export default class AulaBuilder {
  private constructor(private props: AulaProps) {}

  static get criar(): AulaBuilder {
    return new AulaBuilder({
      nome: NomeAula.aleatorio,
      duracao: faker.number.int({ min: 90, max: 3600 }),
      ordem: faker.number.int({ min: 1, max: 100 }),
      videoUrl: faker.internet.url(),
    })
  }

  get agora() {
    return new Aula(this.props)
  }

  comId(id: string) {
    this.props.id = id
    return this
  }

  comNome(nome: string): AulaBuilder {
    this.props.nome = nome
    return this
  }

  get semNome(): AulaBuilder {
    this.props.nome = undefined
    return this
  }

  comDuracao(duracao: number): AulaBuilder {
    this.props.duracao = duracao
    return this
  }

  get semDuracao(): AulaBuilder {
    this.props.duracao = undefined
    return this
  }

  comOrdem(ordem: number): AulaBuilder {
    this.props.ordem = ordem
    return this
  }

  get semOrdem(): AulaBuilder {
    this.props.ordem = undefined
    return this
  }

  comVideoUrl(videoUrl: string): AulaBuilder {
    this.props.videoUrl = videoUrl
    return this
  }

  get semVideoUrl(): AulaBuilder {
    this.props.videoUrl = undefined
    return this
  }
}
