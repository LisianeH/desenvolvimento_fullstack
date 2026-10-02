// com o ? ele pode ser não preenchido, ficar vazio
interface IAddress{
    street: string;
    number: number;
    city: string;
    zip?: string;
}

// readonly não consegue alterar o valor depois de atribuido a variável
interface IUser{
    readonly id: number;
    name: string;
    email: string;
    address: IAddress;
}

const person: IUser = {
    id: 1001,
    name: "Ana",
    email: "ana@email.com",
    address: {
        street: "Rua Flores",
        number: 200,
        city: "Passo fundo",
        zip: "90615-020"
    }
}

console.log(person);

interface IStudent extends IUser{
    registration: string;
    year: number;
}

const student: IStudent = {
    id: 1002,
    name: "Maria",
    email: "maria@email.com",
    registration: "145877",
    year: 2,
    address: {
        street: "Rua das Camelias",
        number: 120,
        city: "Ivoti"
    }
}

console.log(student);