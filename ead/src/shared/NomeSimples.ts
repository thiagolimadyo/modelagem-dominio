import Erros from '@/constants/Erros'
import Validador from '@/utils/Validador'

export default class NomeSimples {
  constructor(
    readonly valor: string,
    readonly minimo: number,
    readonly maximo: number
  ) {
    this.valor = valor?.trim() ?? ''

    const erros = Validador.combinar(
      Validador.naoVazio(this.valor, Erros.NOME_VAZIO),
      Validador.tamanhoMaiorQue(this.valor, this.minimo, Erros.NOME_PEQUENO),
      Validador.tamanhoMenorQue(this.valor, this.maximo, Erros.NOME_GRANDE)
    )

    if (erros) throw erros
  }

  get completo() {
    return this.valor
  }

  get pascalCase() {
    return this.valor.split(' ').map(this.capitalize).join(' ')
  }

  private capitalize(palavra: string) {
    return (
      palavra.substring(0, 1).toUpperCase() + palavra.substring(1).toLowerCase()
    )
  }
}
