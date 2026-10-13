class ContaBancaria{
    private _saldo:number; // underline é uma convernção de quanto é privado
    
    constructor(
        public readonly numero: string,
        public titular:string,
        public saldoInicial:number  
    ){
        this._saldo = saldoInicial;
    }

    public get saldo():number{
        return this._saldo;
    }

    public depositar( valor:number ):void{
        if ( valor <= 0 ){
            console.warn("Valor de depósito deve ser positivo");
            return;
        }
        this._saldo += valor;
    }

    public sacar( valor:number ):boolean{
        if( valor <= 0 || valor > this._saldo){
            console.warn("Saldo insuficiente");
            return false;
        }
        this._saldo -= valor;
        return true; 
    } 
}

const minhaConta = new ContaBancaria( "123",  "Lisiane Hoffmeister", 0);
console.log(minhaConta.saldo);

minhaConta.depositar(-500);
console.log(minhaConta.saldo);

minhaConta.depositar(600);
console.log(minhaConta.saldo);

minhaConta.sacar(610);
console.log(minhaConta.saldo);

minhaConta.sacar(50);
console.log(minhaConta.saldo);