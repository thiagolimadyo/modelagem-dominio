// https://clubes.obmep.org.br/blog/a-matematica-nos-documentos-a-matematica-dos-cpfs/
import Erros from '../constants/Erros'

export default class Cpf {
  readonly valor: string

  constructor(valor: string) {
    this.valor = valor.trim()

    if (!Cpf.isValido(this.valor)) throw new Error(Erros.CPF_INVALIDO)

    Cpf.validarDV(this.valor)
  }

  get formatado() {
    return
  }

  get digitoVerificador() {
    return
  }

  static isValido(cpf: string): boolean {
    const regex = /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/
    return regex.test(cpf)
  }

  private static validarDV(cpf: string): boolean {
    const arr1 = cpf.substring(0, 9).split('').map(Number)

    const s1 = calculo(cpfNumber)
    const s2 = calculo(cpfNumber.splice(8, 1, s1))

    console.log('splice', cpfNumber, cpfNumber.splice(8, 1, s1))
    console.log('S1', s1)

    console.log('s2', s2)

    function calculo(numeros: number[]) {
      console.log(numeros)
      let multiplicador = 10
      const soma = numeros.reduce((acc, item) => {
        return acc + item * multiplicador--
      }, 0)
      const resto = soma % 11
      return resto === (0 | 1) ? 0 : 11 - resto
    }

    // let multiplicador = 10

    // const soma1 = cpfNumber.reduce((acc, item) => {
    //   const result = multiplicador * item
    //   multiplicador--
    //   return (acc += result)
    // }, 0)

    // const resto1 = soma1 % 11
    // const digitoVerificador1 = resto1 === (0 | 1) ? 0 : 11 - resto1

    // const soma2 = cpfNumber.slice(1)
    // soma2.push(digitoVerificador1)

    // multiplicador = 10

    // const resSoma2 = soma2.reduce((acc, item) => {
    //   const result = item * multiplicador
    //   multiplicador--
    //   return acc + result
    // }, 0)

    // const resto2 = resSoma2 % 11
    // const digitoVerificador2 = resto2 === (0 | 1) ? 0 : 11 - resto2

    // console.log(digitoVerificador1, digitoVerificador2)

    return true
  }
}
