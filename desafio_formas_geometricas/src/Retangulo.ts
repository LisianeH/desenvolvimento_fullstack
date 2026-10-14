import { Forma } from "./Forma";

export class Retangulo extends Forma {
    constructor(public base: number, public altura: number) {
        super("Retângulo");
    }

    // Área = base * altura
    CalcularArea(): number {
        return this.base * this.altura;
    }
}
