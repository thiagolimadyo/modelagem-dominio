import { it, describe, expect } from 'vitest'
import PessoasPorRegiao from '@/core/pessoa/PessoasPorRegiao'
import RegiaoCpf from '@/core/shared/RegiaoCpf'
import PessoaBuilder from '../../../test/data/PessoaBuilder'

describe('Teste do Serviço de Domínio PessoasPorRegiao', () => {
  it('Deve identificar as pessoas da Região SP', () => {
    const pessoas = PessoaBuilder.criarLista(10000)
    const agrupadas = new PessoasPorRegiao(pessoas).agrupar()

    const pessoasSp = agrupadas.get(RegiaoCpf.SP) ?? []
    const mesmaRegiao = pessoasSp.every((pessoa) =>
      pessoa.cpf.regiao.igual(RegiaoCpf.SP)
    )

    expect(mesmaRegiao).toBeTruthy()

    const pessoasRJ = agrupadas.get(RegiaoCpf.ES_RJ) ?? []
    const regiaoDif = pessoasRJ.every((pessoa) =>
      pessoa.cpf.regiao.diferente(RegiaoCpf.SP)
    )
    expect(regiaoDif).toBeTruthy()
  })
})
