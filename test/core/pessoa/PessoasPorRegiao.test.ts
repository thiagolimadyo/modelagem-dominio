import { it, describe, expect } from 'vitest'
// import { PessoasPorRegiao } from '@/core/pessoa/PessoasPorRegiao'
import PessoaBuilder from '../../../test/data/PessoaBuilder'
import { PessoasPorRegiao } from '@/core/pessoa/PessoasPorRegiao'
import RegiaoCpf from '@/core/shared/RegiaoCpf'

describe('Teste do Serviço de Domínio PessoasPorRegiao', () => {
  it('Deve identificar as pessoas da Região SP', () => {
    const pessoas = PessoaBuilder.criarLista(100)
    const pessoasPorRegiao = new PessoasPorRegiao(pessoas).agrupar()
    const pessoasDeSp = pessoasPorRegiao.get(RegiaoCpf.SP)
    console.log(pessoasDeSp?.length)
  })
})
