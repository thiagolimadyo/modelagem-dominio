import Id from '../shared/Id'
import NomePessoa from '../shared/NomePessoa'

export default class Pessoa {
  readonly id: Id
  readonly nome: NomePessoa

  constructor(nome: string, id?: string) {
    this.id = new Id(id)
    this.nome = new NomePessoa(nome)
  }
}
