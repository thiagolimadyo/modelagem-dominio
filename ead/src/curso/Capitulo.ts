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
    super({
      ...props,
      aulas: props.aulas ? Capitulo.reordenarAulas(props.aulas) : [],
    })

    this.nome = new NomeSimples(props.nome!, 3, 50)
    this.ordem = new Ordem(props.ordem)

    if (!this.props.aulas?.length)
      ErroValidacao.lancar(Erros.CAPITULO_SEM_AULAS)

    this.aulas = this.props.aulas.map((aula) => new Aula(aula))
  }

  moverAulaParaCima(selecionada: Aula): Capitulo {
    const posicao = this.aulas.findIndex((aula) => aula.igual(selecionada))
    const primeira = posicao === 0
    return primeira ? this : this.moverAula(selecionada, posicao - 1)
  }

  moverAulaParaBaixo(selecionada: Aula): Capitulo {
    const posicao = this.aulas.findIndex((aula) => aula.igual(selecionada))
    const ultima = posicao === this.aulas.length - 1
    return ultima ? this : this.moverAula(selecionada, posicao + 1)
  }

  moverAula(selecionada: Aula, posicao: number): Capitulo {
    return this.removerAula(selecionada).adicionarAula(selecionada, posicao)
  }

  removerAula(selecionada: Aula): Capitulo {
    const novasAulas = this.aulas.filter((aula) => aula.diferente(selecionada))

    const aulas = Capitulo.reatribuirOrdens(novasAulas).map(
      (aula) => aula.props
    )

    return this.clone({ aulas })
  }

  adicionarAula(aula: Aula, posicao?: number): Capitulo {
    const novasAulas =
      posicao !== undefined
        ? [...this.aulas.slice(0, posicao), aula, ...this.aulas.slice(posicao)]
        : [...this.aulas, aula]

    const aulas = Capitulo.reatribuirOrdens(novasAulas).map(
      (aula) => aula.props
    )

    return this.clone({ aulas })
  }

  get quantidadeDeAulas(): number {
    return this.aulas.length
  }

  get primeiraAula(): Aula {
    return this.aulas[0]
  }

  get ultimaAula(): Aula {
    return this.aulas[this.quantidadeDeAulas - 1]
  }

  get duracao(): Duracao {
    return this.aulas.reduce(
      (duracaoTotal: Duracao, aula: Aula) => duracaoTotal.somar(aula.duracao),
      new Duracao(0)
    )
  }

  private static reordenarAulas(aulasProps: AulaProps[]): AulaProps[] {
    const aulas = aulasProps.map((aulaProps) => new Aula(aulaProps))
    const aulasOrdenadas = aulas.sort(Ordem.ordenar)
    return Capitulo.reatribuirOrdens(aulasOrdenadas).map((aula) => aula.props)
  }

  private static reatribuirOrdens(aulas: Aula[]): Aula[] {
    return aulas.map((aula, i) => aula.clone({ ordem: i + 1 }))
  }
}
