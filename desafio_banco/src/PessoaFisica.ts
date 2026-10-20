import { Auxiliar } from "./Auxiliar";
import { Pessoa } from "./Pessoa";

export class PessoaFisica extends Pessoa {
  private _nome: string;
  private _sobrenome: string;
  private _rg: string;
  private _cpf: string;
  private _dataNasc: Date;
  private _renda: number;

  constructor(
    endereco: string,
    tel: string,
    email: string,
    nome: string,
    sobrenome: string,
    rg: string,
    cpf: string,
    dataNasc: Date
  ) {
    // Valida antes do super() para que um cadastro inválido não consuma um id.
    nome = Pessoa.exigirTexto(nome, "nome");
    sobrenome = Pessoa.exigirTexto(sobrenome, "sobrenome");
    rg = Pessoa.exigirTexto(rg, "RG");
    cpf = Pessoa.exigirTexto(cpf, "CPF");
    dataNasc = Pessoa.exigirData(dataNasc, "data de nascimento");

    super(endereco, tel, email);

    this._nome = nome;
    this._sobrenome = sobrenome;
    this._rg = rg;
    this._cpf = cpf;
    this._dataNasc = dataNasc;
    this._renda = 0;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(nome: string) {
    this._nome = Pessoa.exigirTexto(nome, "nome");
  }

  get sobrenome(): string {
    return this._sobrenome;
  }

  set sobrenome(sobrenome: string) {
    this._sobrenome = Pessoa.exigirTexto(sobrenome, "sobrenome");
  }

  get rg(): string {
    return this._rg;
  }

  set rg(rg: string) {
    this._rg = Pessoa.exigirTexto(rg, "RG");
  }

  get cpf(): string {
    return this._cpf;
  }

  set cpf(cpf: string) {
    this._cpf = Pessoa.exigirTexto(cpf, "CPF");
  }

  get dataNasc(): Date {
    return this._dataNasc;
  }

  set dataNasc(dataNasc: Date) {
    this._dataNasc = Pessoa.exigirData(dataNasc, "data de nascimento");
  }

  get idade(): number {
    return Auxiliar.calcularIdade(this._dataNasc);
  }

  get faixaEtaria(): string {
    return Auxiliar.faixaEtaria(this.idade);
  }

  get renda(): number {
    return this._renda;
  }

  set renda(renda: number) {
    if (renda < 0) {
      throw new Error("A renda não pode ser negativa.");
    }
    this._renda = renda;
  }

  get rendaOuFaturamento(): number {
    return this._renda;
  }
}
