import { Contatinho } from "./Contatinho";

export abstract class Mensagem {
  private _destinatario: Contatinho;
  private _horaEnvio: string;
  private _conteudo: string;

  constructor(destinatario: Contatinho, horaEnvio: string, conteudo: string) {
    this._destinatario = destinatario;
    this._horaEnvio = horaEnvio;
    this._conteudo = conteudo;
  }

  get destinatario(): Contatinho {
    return this._destinatario;
  }

  get horaEnvio(): string {
    return this._horaEnvio;
  }

  get conteudo(): string {
    return this._conteudo;
  }

  public abstract toString(): void;
}
