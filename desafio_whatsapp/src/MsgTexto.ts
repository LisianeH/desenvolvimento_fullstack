import { Contatinho } from "./Contatinho";
import { Mensagem } from "./Mensagem";

export class MsgTexto extends Mensagem {
  private _numChar: number;

  constructor(destinatario: Contatinho, horaEnvio: string, conteudo: string) {
    super(destinatario, horaEnvio, conteudo);
    this._numChar = conteudo.length;
  }

  get numChar(): number {
    return this._numChar;
  }

  public toString(): void {
    console.log(
      `[Texto] Para: ${this.destinatario.nome} (${this.destinatario.celular}) | ` +
        `Hora: ${this.horaEnvio} | Conteúdo: "${this.conteudo}" | ` +
        `Caracteres: ${this._numChar}`
    );
  }
}
