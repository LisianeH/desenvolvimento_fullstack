import { Contatinho } from "./Contatinho";
import { Mensageiro } from "./Mensageiro";
import { MsgAudio } from "./MsgAudio";
import { MsgFoto } from "./MsgFoto";
import { MsgTexto } from "./MsgTexto";

const app = new Mensageiro();

const ana = new Contatinho("Ana", "(11) 91234-5678");
const bruno = new Contatinho("Bruno", "(21) 99876-5432");

app.adicionarContato(ana);
app.adicionarContato(bruno);

app.enviarMensagem(new MsgTexto(ana, "10:15", "Oi, tudo bem?"));
app.enviarMensagem(new MsgAudio(bruno, "10:20", "audio_001.mp3", 35));
app.enviarMensagem(new MsgFoto(ana, "10:30", "praia.jpg", 2048));

app.listarContatos();
console.log();
app.listarMensagens();
