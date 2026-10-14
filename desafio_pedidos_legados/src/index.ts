import { IItemCardapio, IPedido, adicionarItem, calcularTotal } from "./pedidos";

const suco: IItemCardapio = { id: 1, nome: "Suco de laranja", preco: 8, categoria: "bebida" };
const lasanha: IItemCardapio = { id: 2, nome: "Lasanha", preco: 42.5, categoria: "prato_principal" };
const pudim: IItemCardapio = { id: 3, nome: "Pudim", preco: 12, categoria: "sobremesa" };

const pedido: IPedido = { id: 100, cliente: "Lisiane", itens: [], status: "aberto" };

adicionarItem(pedido, suco);
adicionarItem(pedido, lasanha);
console.log("Total sem desconto:", calcularTotal(pedido));
console.log("Total com 10% de desconto:", calcularTotal(pedido, 10));
console.log("Total com cupom inválido (150%):", calcularTotal(pedido, 150));

pedido.status = "pago";
adicionarItem(pedido, pudim); // deve exibir erro

pedido.status = "cancelado";
console.log("Total de pedido cancelado:", calcularTotal(pedido, 10));