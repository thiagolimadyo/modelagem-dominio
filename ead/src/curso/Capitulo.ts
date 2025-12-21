import Entidade, { EntidadeProps } from '@/shared/Entidade'
import Aula, { AulaProps } from './Aula'
import NomeSimples from '@/shared/NomeSimples'
import Ordem from '@/shared/Ordem'
import ErroValidacao from '@/error/ErroValidacao'
import Erros from '@/constants/Erros'
import Duracao from '@/shared/Duracao'

export interface CapituloProps extends EntidadeProps {
  nome?: string
  ordem?: number
  aulas?: AulaProps[]
}

export default class Capitulo extends Entidade<CapituloProps> {
  readonly nome: NomeSimples
  readonly ordem: Ordem
  readonly aulas: Aula[]

  constructor(props: CapituloProps) {
    super(props)

    this.nome = new NomeSimples(props.nome!, 3, 50)
    this.ordem = new Ordem(props.ordem)

    if (!props.aulas) ErroValidacao.lancar(Erros.CAPITULO_SEM_AULAS)

    this.aulas = props.aulas.map((aula) => new Aula(aula))
  }

  get duracao(): Duracao {
    return this.aulas.reduce(
      (duracaoTotal: Duracao, aula: Aula) => duracaoTotal.somar(aula.duracao),
      new Duracao(0)
    )
  }
}
