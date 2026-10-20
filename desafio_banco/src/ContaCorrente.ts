import { Conta } from "./Conta";
import type { Depositavel } from "./Depositavel";
import { Pessoa } from "./Pessoa";
import { TipoConta } from "./TipoConta";

export class ContaCorrente extends Conta implements Depositavel {
  public static readonly RENDA_MINIMA_ESPECIAL: number = 5000;

  private _tipo: TipoConta;

  constructor(
    titular: Pessoa,
    numero: number,
    agencia: number,
    tipo: TipoConta,
    taxaSaque: number = 0
  ) {
    super(titular, numero, agencia, taxaSaque);
    if (
      tipo === TipoConta.ESPECIAL &&
      titular.rendaOuFaturamento <= ContaCorrente.RENDA_MINIMA_ESPECIAL
    ) {
      throw new Error(
        "Conta especial exige renda/faturamento superior a R$ 5.000,00."
      );
    }
    this._tipo = tipo;
  }

  get tipo(): TipoConta {
    return this._tipo;
  }

  // 150% da renda (simples) ou 250% da renda (especial).
  get limite(): number {
    const percentual = this._tipo === TipoConta.ESPECIAL ? 2.5 : 1.5;
    return this.titular.rendaOuFaturamento * percentual;
  }

  // Juros sobre o limite utilizado: 5% (simples) ou 2% (especial).
  get taxaDoLimite(): number {
    return this._tipo === TipoConta.ESPECIAL ? 0.02 : 0.05;
  }

  protected saldoDisponivel(): number {
    return this.consultarSaldo() + this.limite;
  }

  public depositar(valor: number): void {
    this.validarValor(valor);
    this.creditar(valor);
  }

  // O valor do boleto vem no código de barras de 44 dígitos (posições 10 a 19, em centavos).
  public pagar(codigoBarras: string): void {
    const digitos = (codigoBarras ?? "").replace(/\D/g, "");
    if (digitos.length !== 44) {
      throw new Error("Código de barras inválido: são necessários 44 dígitos.");
    }
    const valor = Number(digitos.substring(9, 19)) / 100;
    this.validarValor(valor);
    this.garantirFundos(valor);
    this.debitar(valor);
  }

  public emprestimo(valor: number): void {
    this.validarValor(valor);
    this.creditar(valor);
  }

  // Cobra os juros sobre a parte do limite que está em uso (saldo negativo).
  public cobrarJurosDoLimite(): void {
    const saldo = this.consultarSaldo();
    if (saldo < 0) {
      this.debitar(-saldo * this.taxaDoLimite);
    }
  }
}
