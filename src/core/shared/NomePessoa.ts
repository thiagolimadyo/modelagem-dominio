import Erros from '../constants/Erros'
import Validador from '../utils/Validador'

export default class NomePessoa {
  readonly nome: string

  constructor(nome: string) {
    this.nome = nome.trim()

    const erros = Validador.combinar(
      Validador.naoVazia(this.nome, Erros.NOME_VAZIO),
      Validador.tamanhoMaiorQue(this.nome, 4, Erros.NOME_PEQUENO),
      Validador.tamanhoMenorQue(this.nome, 140, Erros.NOME_GRANDE),
      Validador.naoVazia(this.nome.split(' ')[1], Erros.NOME_SEM_SOBREBOME),
      Validador.regex(
        this.nome,
        /^[a-zA-ZÀ-ú\s]+$/,
        Erros.NOME_CARACTERES_INVALIDOS
      )
    )

    if (erros) throw new Error(erros.join(','))
  }

  get completo() {
    return this.nome
  }

  get primeiroNome() {
    return this.nome.split(' ')[0]
  }

  get sobrenomes(): string[] {
    return this.nome.split(' ').slice(1)
  }

  get sobrenomesFormatados(): string {
    return this.sobrenomes.join(' ')
  }

  get ultimoSobrenome(): string {
    return this.sobrenomes.at(-1) as string
  }
}
