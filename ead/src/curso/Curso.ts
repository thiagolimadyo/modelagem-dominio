import Entidade, { EntidadeProps } from '@/shared/Entidade'
import Capitulo, { CapituloProps } from './Capitulo'
import NomeSimples from '@/shared/NomeSimples'
import Duracao from '@/shared/Duracao'
import Ordem from '@/shared/Ordem'
import ErroValidacao from '@/error/ErroValidacao'
import Erros from '@/constants/Erros'

export interface CursoProps extends EntidadeProps {
  nome?: string
  data?: Date
  capitulos?: CapituloProps[]
  duracao?: number
  quantidadeDeAulas?: number
}

export default class Curso extends Entidade<CursoProps> {
  readonly nome: NomeSimples
  readonly data: Date
  readonly capitulos: Capitulo[]
  readonly duracao: Duracao
  readonly quantidadeDeAulas: number

  constructor(props: CursoProps) {
    super({
      ...props,
      data: props.data ?? new Date(),
      capitulos: Curso.reordenarCapitulos(props.capitulos! ?? []),
      ...Curso.calcularNumerosDoCurso(props),
    })

    this.nome = new NomeSimples(props.nome!, 3, 50)
    this.data = this.props.data!
    this.capitulos = this.props.capitulos!.map((c) => new Capitulo(c))
    this.duracao = new Duracao(this.props.duracao)
    this.quantidadeDeAulas = this.props.quantidadeDeAulas!

    const { duracao, quantidadeDeAulas } = this.props

    if (duracao! <= 0) {
      ErroValidacao.lancar(Erros.CURSO_SEM_DURACAO, duracao)
    }

    if (quantidadeDeAulas! <= 0) {
      ErroValidacao.lancar(Erros.CURSO_SEM_AULAS, quantidadeDeAulas)
    }
  }

  private static calcularNumerosDoCurso(props: CursoProps) {
    if (!props.capitulos) {
      return {
        duracao: props.duracao ?? 0,
        quantidadeDeAulas: props.quantidadeDeAulas ?? 0,
      }
    }

    const capitulos = props.capitulos?.map((c) => new Capitulo(c))
    const duracao = capitulos?.reduce((c, t) => c + t.duracao.segundos, 0)
    const quantidadeDeAulas = capitulos?.reduce(
      (c, t) => c + t.quantidadeDeAulas,
      0
    )
    return { duracao, quantidadeDeAulas }
  }

  moverCapitulo(selecionado: Capitulo, posicao: number): Curso {
    return (
      this.removerCapitulo(selecionado),
      this.adicionarCapitulo(selecionado, posicao)
    )
  }

  moverCapituloParaCima(selecionado: Capitulo): Curso {
    const posicao = this.capitulos.findIndex((c) => c.igual(selecionado))
    const primeiraPosicao = posicao === 0
    return primeiraPosicao ? this : this.moverCapitulo(selecionado, posicao - 1)
  }

  moverCapituloParaBaixo(selecionado: Capitulo): Curso {
    const posicao = this.capitulos.findIndex((c) => c.igual(selecionado))
    const pultimaPosicao = posicao === this.capitulos.length - 1
    return pultimaPosicao ? this : this.moverCapitulo(selecionado, posicao + 1)
  }

  adicionarCapitulo(capitulo: Capitulo, posicao?: number): Curso {
    const atuais = this.capitulos

    const novosCapitulos =
      posicao !== undefined
        ? [...atuais.slice(0, posicao), capitulo, ...atuais.slice(posicao)]
        : [...atuais, capitulo]

    const capitulos = Curso.reatribuirOrdens(novosCapitulos).map((c) => c.props)

    return this.clone({ capitulos })
  }

  removerCapitulo(selecionado: Capitulo): Curso {
    const capitulosRestantes = this.capitulos.filter((c) =>
      c.diferente(selecionado)
    )

    const capitulos = Curso.reatribuirOrdens(capitulosRestantes).map(
      (c) => c.props
    )

    return this.clone({ capitulos })
  }

  get primeiroCapitulo() {
    return this.capitulos[0]
  }

  get ultimoCapitulo(): Capitulo {
    return this.capitulos[this.capitulos.length - 1]
  }

  private static reordenarCapitulos(
    capitulosProps: CapituloProps[]
  ): CapituloProps[] {
    const capitulos = capitulosProps.map((c) => new Capitulo(c))

    const capitulosOrdenados = capitulos.sort(Ordem.ordenar)

    return Curso.reatribuirOrdens(capitulosOrdenados).map((c) => c.props)
  }

  private static reatribuirOrdens(capitulos: Capitulo[]): Capitulo[] {
    return capitulos.map((cap, i) => cap.clone({ ordem: i + 1 }))
  }
}
