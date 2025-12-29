import ProgressoCurso, { ProgressoCursoProps } from '@/progresso/ProgressoCurso'
import Id from '@/shared/Id'
import NomesCurso from './NomesCurso'
import { faker } from '@faker-js/faker/locale/pt_BR'
import ProgressoAulaBuilder from './ProgressoAulaBuilder'
import ProgressoAula, { ProgressoAulaProps } from '@/progresso/ProgressoAula'

export default class ProgressoCursoBuilder {
  private constructor(private props: ProgressoCursoProps) {}

  static criar(qtde: number = 10): ProgressoCursoBuilder {
    const aulas = ProgressoAulaBuilder.criarListaCom(qtde).map((a) => a.props)

    return new ProgressoCursoBuilder({
      id: Id.novo.valor,
      emailUsuario: faker.internet.email(),
      nomeCurso: NomesCurso.aleatorio,
      data: faker.date.recent(),
      aulaSelecionadaId: aulas[0].id,
      aulas,
    })
  }

  comId(id: string): ProgressoCursoBuilder {
    this.props.id = id
    return this
  }

  semId(): ProgressoCursoBuilder {
    this.props.id = undefined
    return this
  }

  comNomeCurso(nomeCurso: string): ProgressoCursoBuilder {
    this.props.nomeCurso = nomeCurso
    return this
  }

  semNomeCurso(): ProgressoCursoBuilder {
    this.props.nomeCurso = undefined
    return this
  }

  comEmailUsuario(email: string): ProgressoCursoBuilder {
    this.props.emailUsuario = email
    return this
  }

  semEmailUsuario(): ProgressoCursoBuilder {
    this.props.emailUsuario = undefined
    return this
  }

  comData(): ProgressoCursoBuilder {
    this.props.data = new Date()
    return this
  }

  semData(): ProgressoCursoBuilder {
    this.props.data = undefined
    return this
  }

  comAulaSelecionada(id: string): ProgressoCursoBuilder {
    this.props.aulaSelecionadaId = id
    return this
  }

  semAulaSelecionada(): ProgressoCursoBuilder {
    this.props.aulaSelecionadaId = undefined
    return this
  }

  comAulas(aulas: ProgressoAulaProps[]): ProgressoCursoBuilder {
    this.props.aulas = [...aulas]
    this.props.aulaSelecionadaId = aulas.length > 0 ? aulas[0].id : undefined
    return this
  }

  semAulas(): ProgressoCursoBuilder {
    this.props.aulas = undefined
    return this
  }

  agora(): ProgressoCurso {
    return new ProgressoCurso(this.props)
  }
}
