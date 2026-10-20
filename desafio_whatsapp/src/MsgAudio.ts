import { Contatinho } from "./Contatinho";
import { Mensagem } from "./Mensagem";

export class MsgAudio extends Mensagem {
  private _duracao: number;

  constructor(
    destinatario: Contatinho,
    horaEnvio: string,
    conteudo: string,
    duracao: number
  ) {
    super(destinatario, horaEnvio, conteudo);
    this._duracao = duracao;
  }

  get duracao(): number {
    return this._duracao;
  }

  public toString(): void {
    console.log(
      `[Áudio] Para: ${this.destinatario.nome} (${this.destinatario.celular}) | ` +
        `Hora: ${this.horaEnvio} | Arquivo: ${this.conteudo} | ` +
        `Duração: ${this._duracao}s`
    );
  }
}
