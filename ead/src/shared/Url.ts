import Erros from '@/constants/Erros'
import ErroValidacao from '@/error/ErroValidacao'

export default class Url {
  readonly valor: string
  private url: URL

  constructor(valor?: string) {
    this.valor = valor?.trim() ?? ''

    if (!Url.isValida(this.valor)) {
      ErroValidacao.lancar(Erros.URL_INVALIDA)
    }

    this.url = new URL(this.valor)
  }

  get protocolo() {
    return this.url.protocol.split('').slice(0, -1).join('')
  }

  get dominio() {
    return this.url.hostname
  }

  get caminho() {
    return this.url.pathname
  }

  get parametros(): any {
    const params = this.url.searchParams.toString().split('&')
    return params.reduce((paramsObj, param) => {
      const [chave, valor] = param.split('=')
      return { ...paramsObj, [chave]: valor }
    }, {} as any)
  }

  static isValida(valor: string): boolean {
    try {
      new URL(valor)
      return true
    } catch (erros: any) {
      return false
    }
  }
}
