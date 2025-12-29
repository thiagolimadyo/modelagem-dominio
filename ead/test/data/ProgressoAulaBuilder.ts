import ProgressoAula, { ProgressoAulaProps } from '@/progresso/ProgressoAula'
import NomeAula from './NomeAula'
import { faker } from '@faker-js/faker'
import Id from '@/shared/Id'
import Duracao from '@/shared/Duracao'

export default class ProgressoAulaBuilder {
  private constructor(private props: ProgressoAulaProps) {}

  static criar(): ProgressoAulaBuilder {
    const iniciado = faker.datatype.boolean()
    const concluido = faker.datatype.boolean()

    return new ProgressoAulaBuilder({
      id: Id.novo.valor,
      nome: NomeAula.aleatorio,
      duracao: faker.number.int({ min: 90, max: 3600 }),
      dataInicio: iniciado ? faker.date.recent() : undefined,
      dataConclusao: concluido ? faker.date.recent() : undefined,
    })
  }

  static criarListaCom(qtde: number = 10): ProgressoAula[] {
    return Array.from({ length: qtde }).map(() => {
      return ProgressoAulaBuilder.criar().agora()
    })
  }

  agora(): ProgressoAula {
    return new ProgressoAula(this.props)
  }

  comId(id: string): ProgressoAulaBuilder {
    this.props.id = id
    return this
  }

  semId(): ProgressoAulaBuilder {
    this.props.id = undefined
    return this
  }

  comNome(nome: string): ProgressoAulaBuilder {
    this.props.nome = nome
    return this
  }

  semNome(): ProgressoAulaBuilder {
    this.props.nome = undefined
    return this
  }

  comDuracao(duracao: number): ProgressoAulaBuilder {
    this.props.duracao = duracao
    return this
  }

  semDuracao(): ProgressoAulaBuilder {
    this.props.duracao = undefined
    return this
  }

  iniciado(): ProgressoAulaBuilder {
    this.props.dataInicio = new Date()
    return this
  }

  naoIniciado(): ProgressoAulaBuilder {
    this.props.dataInicio = undefined
    return this
  }

  concluido(): ProgressoAulaBuilder {
    this.props.dataConclusao = new Date()
    return this
  }

  naoConcluido(): ProgressoAulaBuilder {
    this.props.dataConclusao = undefined
    return this
  }
}
