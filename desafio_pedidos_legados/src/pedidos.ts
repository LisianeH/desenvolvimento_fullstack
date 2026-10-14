export type CategoriaItem = "bebida" | "prato_principal" | "sobremesa";
export type StatusPedido = "aberto" | "pago" | "cancelado";

export interface IItemCardapio {
    readonly id: number;
    nome: string;
    preco: number;
    categoria: CategoriaItem;
}

export interface IPedido {
    readonly id: number;
    cliente: string;
    itens: IItemCardapio[];
    status: StatusPedido;
    observacoes?: string;
}

export function calcularTotal(pedido: IPedido, descontoPercentual?: number): number {
    if (pedido.status === "cancelado") {
        return 0;
    }

    const subtotal = pedido.itens.reduce((soma, item) => soma + item.preco, 0);

    if (descontoPercentual === undefined) {
        return subtotal;
    }

    // Cupom inválido (negativo, acima de 100 ou não numérico) não pode alterar o valor da conta
    const cupomValido =
        Number.isFinite(descontoPercentual) &&
        descontoPercentual >= 0 &&
        descontoPercentual <= 100;

    if (!cupomValido) {
        console.error(`Desconto inválido (${descontoPercentual}%): informe um valor entre 0 e 100. Total calculado sem desconto.`);
        return subtotal;
    }

    return subtotal - subtotal * (descontoPercentual / 100);
}

export function adicionarItem(pedido: IPedido, novoItem: IItemCardapio): void {
    if (pedido.status === "pago" || pedido.status === "cancelado") {
        console.error(`Erro: não é possível adicionar itens ao pedido ${pedido.id}, pois ele está "${pedido.status}".`);
        return;
    }

    pedido.itens.push(novoItem);
}