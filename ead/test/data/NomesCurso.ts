export default class NomesCurso {
  static readonly nomes = [
    'Arquitetura Limpa',
    'Typescript',
    'Javascript',
    'Domain Driven Design',
  ]

  static get aleatorio(): string {
    const indice = Math.floor(NomesCurso.nomes.length * Math.random())

    return NomesCurso.nomes[indice]
  }
}
