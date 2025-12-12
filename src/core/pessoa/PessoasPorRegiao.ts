import RegiaoCpf from '../shared/RegiaoCpf'
import Pessoa from './Pessoa'

export class PessoasPorRegiao {
  constructor(private pessoas: Pessoa[]) {}

  agrupar(): Map<RegiaoCpf, Pessoa[]> {
    return this.pessoas.reduce((map, pessoa) => {
      const regiao = pessoa.cpf.RegiaoCpf

      const pessoasDaRegiao = map.get(regiao) ?? []
      pessoasDaRegiao.push(pessoa)
      map.set(regiao, pessoasDaRegiao)

      return map
    }, new Map<RegiaoCpf, Pessoa[]>())
  }
}
