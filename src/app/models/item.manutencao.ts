import { Fornecedor } from "./fornecedor";

export interface ItemManutencao {

    id: string,
    descricao: string,
    prazoKm: number,
    prazoMeses: number,
    valor: number,
    fornecedor: Fornecedor
    
}

export interface ItemManutencaoI {

    descricao: string,
    prazoKm: number,
    prazoMeses: number,
    valor: number,
    fornecedor: Fornecedor

}