import { it, expect, describe } from 'vitest'
import ProgressoAulaBuilder from '../data/ProgressoAulaBuilder'
import Erros from '@/constants/Erros'

describe('Testes na Entidade ProgressoAula.ts', () => {
  it('Deve retornar concluído como TRUE mesmo quando não iniciado', () => {
    const progresso = ProgressoAulaBuilder.criar()
      .naoIniciado()
      .concluido()
      .agora()
    expect(progresso.concluido).toBeTruthy()
  })

  it('Deve concluir progresso sem iniciar progresso', () => {
    const progresso = ProgressoAulaBuilder.criar()
      .naoIniciado()
      .naoConcluido()
      .agora()

    const progressoConcluido = progresso.concluir()
    const dataConclusao = progressoConcluido.dataConclusao?.getTime()
    expect(Date.now() - dataConclusao!).toBeLessThan(3000)
    expect(progressoConcluido.concluido).toBeTruthy()
    expect(progressoConcluido.dataInicio).toBeFalsy()
  })

  it('Deve concluir progresso com progresso iniciado', () => {
    const progresso = ProgressoAulaBuilder.criar()
      .iniciado()
      .naoConcluido()
      .agora()

    const progressoConcluido = progresso.concluir()
    expect(progressoConcluido.iniciado).toBeTruthy()
    expect(progressoConcluido.concluido).toBeTruthy()
  })

  it('Deve lançar erro quando nome da aula for indefinido', () => {
    try {
      const progresso = ProgressoAulaBuilder.criar().semNome().agora()
    } catch (erros: any) {
      expect(erros[0].codigo).toBe(Erros.NOME_VAZIO)
      expect(erros[1].codigo).toBe(Erros.NOME_PEQUENO)
    }
  })

  it('Deve lançar erro quando ID for indefinido', () => {
    expect(() => ProgressoAulaBuilder.criar().semId().agora()).toThrowError(
      Erros.ID_INVALIDO
    )
  })

  it('Deve lançar erro quando duração for indefinida', () => {
    expect(() =>
      ProgressoAulaBuilder.criar().semDuracao().agora()
    ).toThrowError(Erros.DURACAO_ZERADA)
  })

  it('Deve iniciar um novo progresso', () => {
    const progresso = ProgressoAulaBuilder.criar()
      .naoIniciado()
      .naoConcluido()
      .agora()

    const progressoIniciado = progresso.iniciar()

    expect(progresso.iniciado).toBeFalsy()
    expect(progressoIniciado.iniciado).toBeTruthy()
  })

  it('Deve zerar um progresso concluído', () => {
    const progresso = ProgressoAulaBuilder.criar().concluido().agora()
    const progressoZerado = progresso.zerar()

    expect(progresso.concluido).toBeTruthy()
    expect(progressoZerado.concluido).toBeFalsy()
    expect(progressoZerado.dataConclusao).toBeUndefined()
  })
})
