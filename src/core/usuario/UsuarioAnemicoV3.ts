export default class UsuarioAnemicoV3 {
  constructor(
    private id: number,
    private nome: string,
    private email: string,
    private senha?: string
  ) {
    this.setId(id)
    this.setNome(nome)
    this.setEmail(email)
    if (senha) this.setSenha(senha)
  }

  getId(): number {
    return this.id
  }

  setId(id: number) {
    this.id = id
  }

  getNome(): string {
    return this.nome
  }

  setNome(nome: string) {
    this.nome = nome
  }

  getEmail(): string {
    return this.email
  }

  setEmail(email: string) {
    this.email = email
  }

  getSenha(): string {
    return this.senha!
  }

  setSenha(senha: string) {
    this.senha = senha
  }
}
