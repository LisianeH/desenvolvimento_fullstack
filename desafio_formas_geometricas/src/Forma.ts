// Classe abstrata: não pode ser instanciada, só serve de base para as formas
export abstract class Forma {
    constructor(public nome: string) {}

    // Cada forma é obrigada a implementar o seu próprio cálculo
    abstract CalcularArea(): number;
}
