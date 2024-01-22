import { Fornecedor } from "./fornecedor";
import { Veiculo } from "./veiculo";

export interface Peca {
    
    id: string;
    nomePeca: string;
    codPeca: string;
    descricao: string;
    marcaFabricante: string;
    modelo: string;
    pequenaPeca?: Peca[];
    fornecedorP: Fornecedor;
    veiculo: Veiculo[];
    fotoPeca?: string;

}

export interface PecaI {
    
    nomePeca: string;
    codPeca: string;
    descricao: string;
    marcaFabricante: string;
    modelo: string;
    pequenaPeca?: Peca[];
    fornecedorP: Fornecedor;
    veiculo: Veiculo[];
    
}

export interface PecaData {
    data: Peca[],
    meta: {
      take: number;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    }
  };