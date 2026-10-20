export abstract class Pessoa {
  private static _numeroDePessoas: number = 0;

  private _id: number;
  private _endereco: string;
  private _tel: string;
  private _email: string;

  constructor(endereco: string, tel: string, email: string) {
    this._endereco = Pessoa.exigirTexto(endereco, "endereço");
    this._tel = Pessoa.exigirTexto(tel, "telefone");
    this._email = Pessoa.exigirTexto(email, "e-mail");
    this._id = ++Pessoa._numeroDePessoas;
  }

  public static get numeroDePessoas(): number {
    return Pessoa._numeroDePessoas;
  }

  get id(): number {
    return this._id;
  }

  get endereco(): string {
    return this._endereco;
  }

  set endereco(endereco: string) {
    this._endereco = Pessoa.exigirTexto(endereco, "endereço");
  }

  get tel(): string {
    return this._tel;
  }

  set tel(tel: string) {
    this._tel = Pessoa.exigirTexto(tel, "telefone");
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = Pessoa.exigirTexto(email, "e-mail");
  }

  // Renda (pessoa física) ou faturamento (pessoa jurídica): usado pela conta corrente.
  public abstract get rendaOuFaturamento(): number;

  protected static exigirTexto(valor: string, campo: string): string {
    if (!valor || valor.trim() === "") {
      throw new Error(`O campo ${campo} é obrigatório.`);
    }
    return valor.trim();
  }

  protected static exigirData(data: Date, campo: string): Date {
    if (!(data instanceof Date) || isNaN(data.getTime())) {
      throw new Error(`O campo ${campo} é obrigatório e deve ser uma data válida.`);
    }
    if (data.getTime() > Date.now()) {
      throw new Error(`O campo ${campo} não pode estar no futuro.`);
    }
    return data;
  }
}
