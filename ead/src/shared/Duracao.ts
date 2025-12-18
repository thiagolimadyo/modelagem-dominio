import Erros from '@/constants/Erros'
import ErroValidacao from '@/error/ErroValidacao'

export default class Duracao {
  static readonly UM_MINUTO: number = 60
  static readonly UMA_HORA: number = 3600

  readonly segundos: number

  constructor(segundos?: number) {
    if (
      segundos !== undefined &&
      (!Number.isFinite(segundos) || segundos < 0)
    ) {
      ErroValidacao.lancar(Erros.DURACAO_INVALIDA)
    }

    this.segundos = segundos ?? 0
  }

  somar(outraDuracao: Duracao) {
    return new Duracao(this.segundos + outraDuracao.segundos)
  }

  igual(outraDuracao: Duracao) {
    return this.segundos === outraDuracao.segundos
  }

  diferente(outraDuracao: Duracao) {
    return this.segundos !== outraDuracao.segundos
  }

  get zerada() {
    return this.segundos === 0
  }

  get hm() {
    const { horas, minutos } = this.partes

    const h = this.format(horas)
    const m = this.format(minutos)

    if (horas) return `${h}h ${m}m`
    return `${m}m`
  }

  get hms() {
    const { horas, minutos, segundos } = this.partes

    const h = this.format(horas)
    const m = this.format(minutos)
    const s = this.format(segundos)

    if (horas > 0) return `${h}h ${m}m ${s}s`
    if (minutos > 0) return `${m}m ${s}s`
    return `${s}s`
  }

  format(obj: number): string {
    return obj.toString().padStart(2, '0')
  }

  get partes() {
    return {
      horas: Math.floor(this.segundos / Duracao.UMA_HORA),
      minutos: Math.trunc(
        Math.floor(this.segundos % Duracao.UMA_HORA) / Duracao.UM_MINUTO
      ),

      segundos: this.segundos % Duracao.UM_MINUTO,
    }
  }
}
