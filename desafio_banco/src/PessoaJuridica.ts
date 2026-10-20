import { Auxiliar } from "./Auxiliar";
import { Pessoa } from "./Pessoa";
import { PessoaFisica } from "./PessoaFisica";

export class PessoaJuridica extends Pessoa {
  private _socios: PessoaFisica[];
  private _cnpj: number;
  private _razaoSocial: string;
  private _nomeFantasia: string;
  private _inscrEstadual: number;
  private _dataAbertura: Date;
  private _faturamento: number;

  constructor(
    endereco: string,
    tel: string,
    email: string,
    socios: PessoaFisica[],
    cnpj: number,
    razaoSocial: string,
    nomeFantasia: string,
    inscrEstadual: number,
    dataAbertura: Date
  ) {
    // Valida antes do super() para que um cadastro inválido não consuma um id.
    if (!socios || socios.length === 0) {
      throw new Error("A pessoa jurídica precisa de ao menos um sócio.");
    }
    if (!cnpj) {
      throw new Error("O campo CNPJ é obrigatório.");
    }
    if (!inscrEstadual) {
      throw new Error("O campo inscrição estadual é obrigatório.");
    }
    razaoSocial = Pessoa.exigirTexto(razaoSocial, "razão social");
    nomeFantasia = Pessoa.exigirTexto(nomeFantasia, "nome fantasia");
    dataAbertura = Pessoa.exigirData(dataAbertura, "data de abertura");

    super(endereco, tel, email);

    this._socios = [...socios];
    this._cnpj = cnpj;
    this._razaoSocial = razaoSocial;
    this._nomeFantasia = nomeFantasia;
    this._inscrEstadual = inscrEstadual;
    this._dataAbertura = dataAbertura;
    this._faturamento = 0;
  }

  get socios(): PessoaFisica[] {
    return [...this._socios];
  }

  public adicionarSocio(socio: PessoaFisica): void {
    this._socios.push(socio);
  }

  get cnpj(): number {
    return this._cnpj;
  }

  get razaoSocial(): string {
    return this._razaoSocial;
  }

  set razaoSocial(razaoSocial: string) {
    this._razaoSocial = Pessoa.exigirTexto(razaoSocial, "razão social");
  }

  get nomeFantasia(): string {
    return this._nomeFantasia;
  }

  set nomeFantasia(nomeFantasia: string) {
    this._nomeFantasia = Pessoa.exigirTexto(nomeFantasia, "nome fantasia");
  }

  get inscrEstadual(): number {
    return this._inscrEstadual;
  }

  get dataAbertura(): Date {
    return this._dataAbertura;
  }

  get idade(): number {
    return Auxiliar.calcularIdade(this._dataAbertura);
  }

  get faturamento(): number {
    return this._faturamento;
  }

  set faturamento(faturamento: number) {
    if (faturamento < 0) {
      throw new Error("O faturamento não pode ser negativo.");
    }
    this._faturamento = faturamento;
  }

  get rendaOuFaturamento(): number {
    return this._faturamento;
  }
}
