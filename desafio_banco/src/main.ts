import { Conta } from "./Conta";
import { ContaCorrente } from "./ContaCorrente";
import { ContaPoupanca } from "./ContaPoupanca";
import { ContaSalario } from "./ContaSalario";
import { Pessoa } from "./Pessoa";
import { PessoaFisica } from "./PessoaFisica";
import { PessoaJuridica } from "./PessoaJuridica";
import { TipoConta } from "./TipoConta";

const brl = (valor: number): string =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function tentar(descricao: string, operacao: () => void): void {
  try {
    operacao();
    console.log(`  OK    ${descricao}`);
  } catch (erro) {
    console.log(`  ERRO  ${descricao} -> ${(erro as Error).message}`);
  }
}

function mostrarSaldo(nome: string, conta: Conta): void {
  console.log(`  ${nome}: ${brl(conta.consultarSaldo())}`);
}

// ---------- Clientes ----------
console.log("=== Clientes ===");
const maria = new PessoaFisica("Rua A, 10", "(11) 91111-1111", "maria@email.com",
  "Maria", "Silva", "12.345.678-9", "123.456.789-00", new Date(1990, 4, 20));
maria.renda = 4000;
const joao = new PessoaFisica("Rua B, 20", "(11) 92222-2222", "joao@email.com",
  "João", "Souza", "98.765.432-1", "987.654.321-00", new Date(1960, 0, 15));
const ana = new PessoaFisica("Rua C, 30", "(11) 93333-3333", "ana@email.com",
  "Ana", "Lima", "11.222.333-4", "111.222.333-44", new Date(2010, 7, 1));
const theo = new PessoaFisica("Rua D, 40", "(11) 94444-4444", "theo@email.com",
  "Theo", "Costa", "55.666.777-8", "555.666.777-88", new Date(2018, 2, 9));

for (const p of [maria, joao, ana, theo]) {
  console.log(`  #${p.id} ${p.nome} ${p.sobrenome}: ${p.idade} anos (${p.faixaEtaria})`);
}

const empresa = new PessoaJuridica("Av. Central, 200", "(11) 3333-3333", "contato@silvatech.com",
  [maria, joao], 12345678000195, "Silva & Souza LTDA", "Silva Tech", 123456789,
  new Date(2015, 2, 10));
empresa.faturamento = 20000;
console.log(`  #${empresa.id} ${empresa.nomeFantasia}: ${empresa.idade} anos, ` +
  `${empresa.socios.length} sócios, faturamento ${brl(empresa.faturamento)}`);
console.log(`  Pessoas cadastradas: ${Pessoa.numeroDePessoas}`);
tentar("Cadastrar pessoa física sem nome", () =>
  new PessoaFisica("Rua", "1", "a@a.com", "", "X", "1", "1", new Date(2000, 0, 1)));
console.log(`  Pessoas cadastradas (inalterado): ${Pessoa.numeroDePessoas}`);

// ---------- Contas ----------
console.log("\n=== Abrindo contas ===");
const salario = new ContaSalario(maria, 1001, 1);
const poupanca = new ContaPoupanca(maria, 1002, 1);
const corrente = new ContaCorrente(maria, 1003, 1, TipoConta.SIMPLES);
const poupancaJoao = new ContaPoupanca(joao, 3001, 1);
const correnteEmpresa = new ContaCorrente(empresa, 2001, 1, TipoConta.ESPECIAL);
console.log(`  Corrente simples da Maria: limite ${brl(corrente.limite)}, juros ${corrente.taxaDoLimite * 100}%`);
console.log(`  Corrente especial da empresa: limite ${brl(correnteEmpresa.limite)}, juros ${correnteEmpresa.taxaDoLimite * 100}%`);
tentar("Conta ESPECIAL para Maria (renda R$ 4.000)", () =>
  new ContaCorrente(maria, 1004, 1, TipoConta.ESPECIAL));

// ---------- Conta corrente ----------
console.log("\n=== Conta corrente (Maria) ===");
tentar("Depositar R$ 1.000", () => corrente.depositar(1000));
tentar("Sacar R$ 1.500 (usa o limite)", () => corrente.sacar(1500));
mostrarSaldo("Saldo", corrente);
tentar("Sacar R$ 6.000 (acima do limite)", () => corrente.sacar(6000));
tentar("Cobrar juros do limite (5% sobre R$ 500)", () => corrente.cobrarJurosDoLimite());
mostrarSaldo("Saldo", corrente);
tentar("Empréstimo de R$ 2.000", () => corrente.emprestimo(2000));
const boleto = "00191" + "9000" + "0000015000" + "0".repeat(25); // boleto de R$ 150,00
tentar("Pagar boleto de R$ 150,00", () => corrente.pagar(boleto));
tentar("Transferir R$ 500 para a conta salário", () => corrente.transferir(salario, 500));
tentar("Transferir R$ 300 para a poupança", () => corrente.transferir(poupanca, 300));
mostrarSaldo("Saldo", corrente);

// ---------- Poupança ----------
console.log(`\n=== Poupança (Maria) - taxa de saque ${brl(ContaPoupanca.TAXA_SAQUE)} ===`);
tentar("Sacar R$ 100", () => poupanca.sacar(100));
mostrarSaldo("Saldo", poupanca);
tentar("Sacar R$ 1.000 (sem saldo)", () => poupanca.sacar(1000));

// ---------- Conta salário ----------
console.log("\n=== Conta salário (Maria) ===");
tentar("Sacar R$ 100 (sem taxa)", () => salario.sacar(100));
tentar("Transferir R$ 200 para a própria poupança", () => salario.transferir(poupanca, 200));
tentar("Transferir R$ 50 para a poupança do João", () => salario.transferir(poupancaJoao, 50));
mostrarSaldo("Saldo salário", salario);
mostrarSaldo("Saldo poupança", poupanca);

// ---------- Conta da empresa ----------
console.log("\n=== Conta corrente especial (empresa) ===");
tentar("Sacar R$ 40.000 (dentro do limite de R$ 50.000)", () => correnteEmpresa.sacar(40000));
mostrarSaldo("Saldo", correnteEmpresa);
tentar("Cobrar juros do limite (2% sobre R$ 40.000)", () => correnteEmpresa.cobrarJurosDoLimite());
mostrarSaldo("Saldo", correnteEmpresa);
