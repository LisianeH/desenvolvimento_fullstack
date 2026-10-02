
let name = "Lisi";

// gera erro quando tentamos trocar o tipo da variavel
// name = 42;

// os dois pontos é para definir o tipo da variavel
let isActive: boolean = true;

// number funciona para numeros inteiros, flutuantes e códigos hexadecimais 
let age: number = 18;
let price: number = 13.90;
let product: string = "pastel";

// a string pode estar dentro de aspas duplas ou aspas simples
let phrase: string = 'Hello World';

// para usar uma frase com função usando ela com crase
let phrase2: string = `Olá, o valor do ${product} é R$ ${price}`;

console.log(phrase2);


// function greeting(name (*NOME DA VARIAVEL): string (*AQUI PARA O TIPO DO PARAMETRO QUE ESTA SENDO PASSADO) ): string (**AQUI O TIPO DE SAÍDA PARA O MÉTODO){
function greeting(name: string): string{
    return `Olá ${name}`;
}

console.log( greeting("Lisi") );


// quando adicionado o " = "alguma coisa" " é o valor que será preenchido caso não seja recebido um valor no parametro
// vazio no retorno do metodo, é considerado metodo void
// "toFixed" é a quantidade de casa depois da virgula
function currencyFormatter(value: number, prefix: string = "R$"):string {
    return `${prefix} ${value.toFixed(2)}`;
}

console.log( currencyFormatter(199.6) );
console.log( currencyFormatter(199.60, "$") ); // sobrescreve o R$ pq adicionamos um valor a variável


// para criar um tipo a convensão é primeira letra maiuscula
type StatusOrder = "billed" | "paid" | "canceled";

function updateStatus(status: StatusOrder) {
    console.log(`New status: ${status}`);
}

updateStatus("paid");


function calcLenght(input: string | number):number{
    if (typeof input === "string"){
        return input.length;
    }
    return input.toString().length;
}

console.log( calcLenght(55484) );
console.log( calcLenght("Hello world!") );


// array
const languages: string[] = ["C#", "Java", "Python"];
languages.push("PHP");

// tupla
let httpResponse: [number, string];
httpResponse = [200, "OK"];


// tipo "any" serve para adicionar qualquer tipo na variavel, inclusive alterar o seu tipo atribuindo outra coisa
let flexData: any = 10;
flexData = "Oi";