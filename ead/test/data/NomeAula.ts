export default class NomeAula {
  static readonly nomes = [
    'Introdução ao JavaScript',
    'História e Evolução do JavaScript',
    'JavaScript Moderno (ES6+)',
    'Variáveis: var, let e const',
    'Tipos Primitivos no JavaScript',
    'Controle de Fluxo: if, switch e loops',
    'Funções e Arrow Functions',
    'Escopo e Closures',
    'Manipulação de Arrays em JavaScript',
    'Métodos Funcionais: map, filter e reduce',
    'Objetos e Estruturas de Dados',
    'Desestruturação de Objetos e Arrays',
    'Operador Spread e Rest',
    'Promises e Controle Assíncrono',
    'Async Await na Prática',
    'Tratamento de Erros em JavaScript',
    'Introdução ao TypeScript',
    'Fundamentos de TypeScript',
    'Configuração de Projetos TypeScript',
    'Tipos Primitivos no TypeScript',
    'Tipagem Avançada com TypeScript',
    'Interfaces e Types',
    'Enums e Union Types',
    'Generics no TypeScript',
    'Type Guards e Narrowing',
    'ESModules e CommonJS',
    'Boas Práticas em Código JavaScript',
    'Clean Code com TypeScript',
    'Introdução a Testes Automatizados',
    'Testes Unitários com Vitest',
    'Mocks e Spies no Vitest',
    'Testes de Integração',
    'Organização e Arquitetura de Pastas',
    'Refatorando Código Legado',
    'Debugando Aplicações JavaScript',
    'Performance e Otimização',
    'Projeto Prático Final',
  ]

  static get aleatorio(): string {
    const indice = Math.floor(NomeAula.nomes.length * Math.random())

    return NomeAula.nomes[indice]
  }
}
