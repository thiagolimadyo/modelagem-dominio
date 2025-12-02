// https://clubes.obmep.org.br/blog/a-matematica-nos-documentos-a-matematica-dos-cpfs/
import Erros from '../constants/Erros'

export default class Cpf {
  readonly valor: string

  constructor(valor: string) {
    this.valor = valor.trim()

    if (!Cpf.isValido(this.valor)) throw new Error(Erros.CPF_INVALIDO)

    if (!Cpf.validarDV(this.valor)) throw new Error(Erros.CPF_DV_INVALIDO)
  }

  get ArrayNumerico() {
    return this.valor.split('').map(Number)
  }

  get formatado() {
    let posicao1 = this.ArrayNumerico.slice(0, 3).join('')
    let posicao2 = this.ArrayNumerico.slice(3, 6).join('')
    let posicao3 = this.ArrayNumerico.slice(6, 9).join('')
    let posicao4 = this.ArrayNumerico.slice(9, 11).join('')

    return `${posicao1}.${posicao2}.${posicao3}-${posicao4}`
  }

  get digitoVerificador() {
    return this.valor.substring(9, 11)
  }

  static isValido(cpf: string): boolean {
    const regex = /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/
    return regex.test(cpf)
  }

  private static validarDV(cpf: string): boolean {
    const cpfNumber = cpf.split('').map(Number)
    const dv1 = this.calcularDV(cpf.substring(0, 9).split('').map(Number))
    const dv2 = this.calcularDV(cpf.substring(1, 9).split('').map(Number), dv1)

    return dv1 === cpfNumber[9] && dv2 === cpfNumber[10]
  }

  private static calcularDV(
    numeros: number[],
    digitoVerificador?: number
  ): number {
    if (digitoVerificador) numeros.push(digitoVerificador)
    let peso = 10

    const calculo = numeros.reduce((acc, item) => {
      return acc + item * peso--
    }, 0)

    const resto = calculo % 11

    return resto === (0 | 1) ? 0 : 11 - resto
  }
}
