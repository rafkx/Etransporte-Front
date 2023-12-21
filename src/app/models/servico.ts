import { Veiculo } from "./veiculo";
import { Fornecedor } from "./fornecedor"

export interface Servico {
    
    id: string;
    descricao: string;
    cod: string,
    fornecedor: Fornecedor[];
    veiculo: Veiculo[];

}

export interface ServicoI {

    descricao: string;
    cod: string;
    fornecedor: Fornecedor[];
    veiculo: Veiculo[];

}

export interface ServicoData {
    data: Servico[],
    meta: {
      take: number;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    }
};