import { Conta } from "./Conta";
import type { Depositavel } from "./Depositavel";
import { Pessoa } from "./Pessoa";

export class ContaPoupanca extends Conta implements Depositavel {
  // Taxa de saque igual para todas as contas poupança.
  public static readonly TAXA_SAQUE: number = 2.5;

  constructor(titular: Pessoa, numero: number, agencia: number) {
    super(titular, numero, agencia, ContaPoupanca.TAXA_SAQUE);
  }

  public depositar(valor: number): void {
    this.validarValor(valor);
    this.creditar(valor);
  }
}
