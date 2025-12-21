export default class NomeCapitulo {
  static readonly nomes = [
    'Introdução',
    'Teoria',
    'Prática',
    'Configurando o Ambiente',
    'Desafio',
  ]

  static get aleatorio() {
    const indice = Math.floor(Math.random() * NomeCapitulo.nomes.length)
    return NomeCapitulo.nomes[indice]
  }
}
