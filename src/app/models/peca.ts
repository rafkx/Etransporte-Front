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