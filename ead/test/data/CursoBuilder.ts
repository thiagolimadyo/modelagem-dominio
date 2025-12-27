import Curso, { CursoProps } from '@/curso/Curso'
import { faker } from '@faker-js/faker'
import NomesCurso from './NomesCurso'
import CapituloBuilder from './CapituloBuilder'
import Capitulo from '@/curso/Capitulo'

export default class CursoBuilder {
  private constructor(private props: CursoProps) {}

  static criar(qtdeCapitulos: number = 3, qtdeAulas: number = 10) {
    return new CursoBuilder({
      nome: NomesCurso.aleatorio,
      data: faker.date.recent(),
      capitulos: CapituloBuilder.criarListaCom(qtdeCapitulos, qtdeAulas).map(
        (c) => c.props
      ),
    })
  }

  agora() {
    return new Curso(this.props)
  }

  comId(id: string): CursoBuilder {
    this.props.id = id
    return this
  }

  semId(): CursoBuilder {
    this.props.id = undefined
    return this
  }

  comNome(nome: string): CursoBuilder {
    this.props.nome = nome
    return this
  }

  semNome(): CursoBuilder {
    this.props.nome = undefined
    return this
  }

  comDuracao(duracao: number): CursoBuilder {
    this.props.duracao = duracao
    return this
  }

  semDuracao(): CursoBuilder {
    this.props.duracao = undefined
    return this
  }

  comCapitulos(capitulos: Capitulo[]): CursoBuilder {
    this.props.capitulos = capitulos.map((a) => a.props)
    return this
  }

  semCapitulos(): CursoBuilder {
    this.props.capitulos = undefined
    return this
  }

  comQuantidadeDeAulas(quantidadeDeAulas: number): CursoBuilder {
    this.props.quantidadeDeAulas = quantidadeDeAulas
    return this
  }

  semQuantidadeDeAulas(): CursoBuilder {
    this.props.quantidadeDeAulas = undefined
    return this
  }
}
