export class Contatinho {
  private _nome: string;
  private _celular: string;

  constructor(nome: string, celular: string) {
    this._nome = nome;
    this._celular = celular;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(nome: string) {
    this._nome = nome;
  }

  get celular(): string {
    return this._celular;
  }

  set celular(celular: string) {
    this._celular = celular;
  }
}
