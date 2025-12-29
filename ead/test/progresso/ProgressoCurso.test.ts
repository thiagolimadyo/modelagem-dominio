import { it, expect, describe } from 'vitest'
import ProgressoCursoBuilder from '../data/ProgressoCursoBuilder'
import Erros from '@/constants/Erros'
import ProgressoAulaBuilder from '../data/ProgressoAulaBuilder'
import { ProgressoAulaProps } from '@/progresso/ProgressoAula'

const builder = () => ProgressoAulaBuilder.criar().naoIniciado().naoConcluido()
const aulas: ProgressoAulaProps[] = [
  builder().comDuracao(600).agora().props,
  builder().comDuracao(600).agora().props,
  builder().comDuracao(600).agora().props,
  builder().comDuracao(600).agora().props,
  builder().comDuracao(600).agora().props,
  builder().comDuracao(600).agora().props,
]

describe('Testes para Entidade ProgressoCurso.ts', () => {
  it('Deve lancar erro ao criar progresso sem aulas', () => {
    expect(() => ProgressoCursoBuilder.criar().semAulas().agora()).toThrowError(
      Erros.PROGRESSO_CURSO_SEM_AULAS
    )
  })

  it('Deve lancar erro ao criar progresso com array de aulas vazio', () => {
    expect(() =>
      ProgressoCursoBuilder.criar().comAulas([]).agora()
    ).toThrowError(Erros.PROGRESSO_CURSO_SEM_AULAS)
  })

  it('Deve calcular a duracao assistida', () => {
    let progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()
    expect(progresso.duracaoAssistida.segundos).toBe(0)

    progresso = progresso.concluirESelecionarProximaAula()
    expect(progresso.duracaoAssistida.segundos).toBe(600)

    progresso = progresso.concluirESelecionarProximaAula()
    expect(progresso.duracaoAssistida.segundos).toBe(1200)

    progresso = progresso.concluirESelecionarProximaAula()
    expect(progresso.duracaoAssistida.segundos).toBe(1800)
  })

  it('Deve calcular a duracao total', () => {
    const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()
    expect(progresso.duracaoTotal.segundos).toBe(3600)
  })

  it('Deve calcular o percentual zero de progresso', () => {
    const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()
    expect(progresso.percentualAssistido).toBe(0)
  })

  it('Deve calcular o percentual de progresso corretamente em 50%', () => {
    let progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()

    progresso = progresso
      .concluirESelecionarProximaAula()
      .concluirESelecionarProximaAula()
      .concluirESelecionarProximaAula()

    expect(progresso.percentualAssistido).toBe(50)
  })

  it('Deve concluir a aula atual', () => {
    let progresso = ProgressoCursoBuilder.criar()
      .comAulas(aulas)
      .agora()
      .concluirAulaAtual()
      .concluirAulaAtual()

    expect(progresso.aulas[0].concluido).toBeTruthy()
    expect(progresso.aulas[1].concluido).toBeFalsy()
  })

  it('Deve concluir curso aula por aula', () => {
    const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()

    expect(progresso.percentualAssistido).toBe(0)
    expect(progresso.concluido).toBeFalsy()

    const progressoConcluido = progresso
      .concluirESelecionarProximaAula()
      .concluirESelecionarProximaAula()
      .concluirESelecionarProximaAula()
      .concluirESelecionarProximaAula()
      .concluirESelecionarProximaAula()
      .concluirESelecionarProximaAula()

    expect(progressoConcluido.percentualAssistido).toBe(100)
    expect(progressoConcluido.concluido).toBeTruthy()
  })

  it('Deve concluir curso inteiro', () => {
    const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora()

    expect(progresso.percentualAssistido).toBe(0)
    expect(progresso.concluido).toBeFalsy()

    const progressoConcluido = progresso.concluirCurso()

    expect(progressoConcluido.percentualAssistido).toBe(100)
    expect(progressoConcluido.concluido).toBeTruthy()
  })
})
