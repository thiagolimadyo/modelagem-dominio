import Erros from '@/constants/Erros'
import ErroValidacao from '@/error/ErroValidacao'

export default class SenhaForte {
  static readonly REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

  constructor(readonly valor?: string) {
    if (!SenhaForte.isValid(this.valor ?? ''))
      ErroValidacao.lancar(Erros.SENHA_FRACA)
  }

  static isValid(senha: string): boolean {
    return SenhaForte.REGEX.test(senha)
  }
}
