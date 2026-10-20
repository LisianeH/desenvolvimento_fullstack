import { Conta } from "./Conta";
import { Pessoa } from "./Pessoa";

export class ContaSalario extends Conta {
  constructor(titular: Pessoa, numero: number, agencia: number) {
    super(titular, numero, agencia, 0); // conta salário não possui taxas
  }

  public transferir(destino: Conta, valor: number): void {
    if (destino?.titular.id !== this.titular.id) {
      throw new Error("A conta salário só pode transferir para contas do mesmo titular.");
    }
    super.transferir(destino, valor);
  }
}
