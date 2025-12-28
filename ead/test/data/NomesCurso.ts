export default class NomesCurso {
  static readonly nomes = [
    'Arquitetura Limpa',
    'Typescript',
    'Javascript',
    'Domain Driven Design',
    'SOLID na Prática',
    'Clean Code',
    'Design Patterns',
    'Node.js',
    'NestJS',
    'React',
    'Angular',
    'Testes Automatizados',
    'Testes com Jest',
    'Testes de Integração',
    'API REST',
    'GraphQL',
    'Banco de Dados Relacional',
    'Banco de Dados NoSQL',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Git e GitHub',
    'Refatoração de Código',
    'Microserviços',
    'Arquitetura Hexagonal',
  ]

  static get aleatorio(): string {
    const indice = Math.floor(NomesCurso.nomes.length * Math.random())

    return NomesCurso.nomes[indice]
  }
}
