import { Pessoa } from "./Pessoa";

export abstract class Conta {
  private _titular: Pessoa;
  private _numero: number;
  private _agencia: number;
  private _saldo: number;
  private _taxaSaque: number;

  constructor(titular: Pessoa, numero: number, agencia: number, taxaSaque: number) {
    if (!titular) {
      throw new Error("Toda conta precisa de um titular.");
    }
    if (taxaSaque < 0) {
      throw new Error("A taxa de saque não pode ser negativa.");
    }
    this._titular = titular;
    this._numero = numero;
    this._agencia = agencia;
    this._taxaSaque = taxaSaque;
    this._saldo = 0;
  }

  get titular(): Pessoa {
    return this._titular;
  }

  get numero(): number {
    return this._numero;
  }

  get agencia(): number {
    return this._agencia;
  }

  get taxaSaque(): number {
    return this._taxaSaque;
  }

  public consultarSaldo(): number {
    return this._saldo;
  }

  public sacar(valor: number): void {
    this.validarValor(valor);
    const total = valor + this._taxaSaque;
    this.garantirFundos(total);
    this.debitar(total);
  }

  public transferir(destino: Conta, valor: number): void {
    if (!destino) {
      throw new Error("Informe a conta de destino.");
    }
    if (destino === this) {
      throw new Error("A conta de destino deve ser diferente da conta de origem.");
    }
    this.validarValor(valor);
    this.garantirFundos(valor);
    this.debitar(valor);
    destino.creditar(valor);
  }

  // Quanto a conta pode gastar: por padrão, só o saldo (não pode ficar negativa).
  protected saldoDisponivel(): number {
    return this._saldo;
  }

  protected garantirFundos(valor: number): void {
    if (valor > this.saldoDisponivel()) {
      throw new Error("Saldo insuficiente.");
    }
  }

  protected validarValor(valor: number): void {
    if (!Number.isFinite(valor) || valor <= 0) {
      throw new Error("O valor deve ser maior que zero.");
    }
  }

  protected debitar(valor: number): void {
    this._saldo = Conta.arredondar(this._saldo - valor);
  }

  protected creditar(valor: number): void {
    this._saldo = Conta.arredondar(this._saldo + valor);
  }

  private static arredondar(valor: number): number {
    return Math.round(valor * 100) / 100;
  }
}
