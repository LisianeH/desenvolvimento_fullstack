import { Forma } from "./Forma";

export class Circulo extends Forma {
    constructor(public raio: number) {
        super("Círculo");
    }

    // Área = pi * r²
    CalcularArea(): number {
        return Math.PI * this.raio ** 2;
    }
}
