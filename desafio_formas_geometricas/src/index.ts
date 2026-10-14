import { Forma } from "./Forma";
import { Quadrado } from "./Quadrado";
import { Circulo } from "./Circulo";
import { Triangulo } from "./Triangulo";
import { Retangulo } from "./Retangulo";

// Todas são tratadas como "Forma": cada uma calcula a área do seu jeito (polimorfismo)
const formas: Forma[] = [
    new Quadrado(4),
    new Retangulo(5, 3),
    new Triangulo(6, 4),
    new Circulo(2),
];

formas.forEach((forma) => {
    console.log(`${forma.nome}: área = ${forma.CalcularArea().toFixed(2)}`);
});
