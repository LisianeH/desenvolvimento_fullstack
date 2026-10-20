export class Auxiliar {
  public static calcularIdade(data: Date): number {
    const hoje = new Date();
    let idade = hoje.getFullYear() - data.getFullYear();
    const jaFezAniversario =
      hoje.getMonth() > data.getMonth() ||
      (hoje.getMonth() === data.getMonth() && hoje.getDate() >= data.getDate());
    if (!jaFezAniversario) {
      idade--;
    }
    return idade;
  }

  public static faixaEtaria(idade: number): string {
    if (idade <= 11) return "criança";
    if (idade <= 21) return "jovem";
    if (idade <= 59) return "adulto";
    return "idoso";
  }
}
