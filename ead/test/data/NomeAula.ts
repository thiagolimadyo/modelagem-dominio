export default class NomeAula {
  static readonly nomes = [
    'Introdução ao JavaScript',
    'Fundamentos de TypeScript',
    'Tipos Primitivos no TypeScript',
    'Funções e Arrow Functions',
    'Async Await na Prática',
    'Promises e Controle Assíncrono',
    'Manipulação de Arrays em JS',
    'Objetos e Estruturas de Dados',
    'Tipagem Avançada com TypeScript',
    'Interfaces e Types',
    'Generics no TypeScript',
    'Enums e Union Types',
    'Tratamento de Erros em JavaScript',
    'Testes Unitários com Vitest',
    'Mocks e Spies no Vitest',
    'Boas Práticas em Código JavaScript',
    'Clean Code com TypeScript',
    'Configuração de Projetos TS',
    'ESModules e CommonJS',
    'JavaScript Moderno ES6+',
  ]

  static get aleatorio(): string {
    const indice = Math.floor(NomeAula.nomes.length * Math.random())

    return NomeAula.nomes[indice]
  }
}
