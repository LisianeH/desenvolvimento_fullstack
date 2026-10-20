import { Contatinho } from "./Contatinho";
import { Mensagem } from "./Mensagem";

export class MsgFoto extends Mensagem {
  private _tamanho: number;

  constructor(
    destinatario: Contatinho,
    horaEnvio: string,
    conteudo: string,
    tamanho: number
  ) {
    super(destinatario, horaEnvio, conteudo);
    this._tamanho = tamanho;
  }

  get tamanho(): number {
    return this._tamanho;
  }

  public toString(): void {
    console.log(
      `[Foto] Para: ${this.destinatario.nome} (${this.destinatario.celular}) | ` +
        `Hora: ${this.horaEnvio} | Arquivo: ${this.conteudo} | ` +
        `Tamanho: ${this._tamanho} KB`
    );
  }
}
