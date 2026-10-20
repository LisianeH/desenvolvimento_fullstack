import { Contatinho } from "./Contatinho";
import { Mensagem } from "./Mensagem";

export class Mensageiro {
  private contatos: Contatinho[] = [];
  private mensagens: Mensagem[] = [];

  public adicionarContato(contato: Contatinho): void {
    this.contatos.push(contato);
  }

  public enviarMensagem(mensagem: Mensagem): void {
    this.mensagens.push(mensagem);
  }

  public listarContatos(): void {
    console.log("- Contatos -");
    this.contatos.forEach((c) => console.log(`${c.nome} - ${c.celular}`));
  }

  public listarMensagens(): void {
    console.log("- Mensagens -");
    this.mensagens.forEach((m) => m.toString());
  }
}
