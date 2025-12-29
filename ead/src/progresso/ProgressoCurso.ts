import Entidade, { EntidadeProps } from '@/shared/Entidade'
import ProgressoAula, { ProgressoAulaProps } from './ProgressoAula'
import Email from '@/shared/Email'
import NomeSimples from '@/shared/NomeSimples'
import ErroValidacao from '@/error/ErroValidacao'
import Erros from '@/constants/Erros'

export interface ProgressoCursoProps extends EntidadeProps {
  emailUsuario?: string
  nomeCurso?: string
  data?: Date
  dataConclusao?: Date
  aulas?: ProgressoAulaProps[]
  aulaSelecionadaId?: string
}

export default class ProgressoCurso extends Entidade<ProgressoCursoProps> {
  readonly emailUsuario: Email
  readonly nomeCurso: NomeSimples
  readonly data: Date
  readonly dataConclusao?: Date
  readonly aulas: ProgressoAula[]
  readonly aulaSelecionada: ProgressoAula

  constructor(props: ProgressoCursoProps) {
    super(props)

    if (!props.aulas?.length) {
      ErroValidacao.lancar(Erros.PROGRESSO_CURSO_SEM_AULAS)
    }

    this.emailUsuario = new Email(props.emailUsuario)
    this.nomeCurso = new NomeSimples(props.nomeCurso!, 3, 50)
    this.data = props.data ?? new Date()
    this.dataConclusao = props.dataConclusao
    this.aulas = props.aulas.map((propsAula) => new ProgressoAula(propsAula))
    this.aulaSelecionada =
      this.aulas.find((aula) => aula.id.valor === props.aulaSelecionadaId) ??
      this.aulas[0]
  }

  get concluido() {
    return
  }

  get duracaoTotal() {
    return
  }

  get duracaoAssistida() {
    return
  }

  get percentualAssistido() {
    return
  }
}
