export default class NomeCapitulo {
  static readonly nomes = [
    'Introdução',
    'Visão Geral do Curso',
    'Objetivos de Aprendizagem',
    'Fundamentos',
    'Teoria',
    'Conceitos-Chave',
    'Boas Práticas',
    'Configurando o Ambiente',
    'Ferramentas Necessárias',
    'Primeiros Passos',
    'Mão na Massa',
    'Prática',
    'Exemplos Práticos',
    'Implementação',
    'Refatoração',
    'Testes',
    'Debugando a Aplicação',
    'Integração',
    'Performance e Otimização',
    'Segurança',
    'Desafio',
    'Projeto Prático',
    'Exercícios',
    'Erros Comuns',
    'Checklist Final',
    'Resumo',
    'Próximos Passos',
    'Conclusão',
  ]

  static get aleatorio() {
    const indice = Math.floor(Math.random() * NomeCapitulo.nomes.length)
    return NomeCapitulo.nomes[indice]
  }
}
