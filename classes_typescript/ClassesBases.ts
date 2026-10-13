// Abordagem Clássica

class FuncionarioTradicional{
    public id: number;
    public nome: string;
    public salario: number;

    constructor( id:number, nome:string, salario:number ){
        this.id = id; 
        this.nome = nome;
        this.salario = salario;
    }
}

// Abordagem Moderna (Parameter Propertie)
class FuncionarioModerno{
    constructor( 
        public readonly id:number, 
        public nome:string,
        public salario:number
    ){}

    mostrarInfo():string{
        return `ID: ${this.id} - Nome: ${this.nome} - Salário: R$${this.salario}`;
    }
}

const dev = new FuncionarioModerno(1, "Lisiane Hoffmeister", 11650);
console.log( dev.mostrarInfo() );