import { Veiculo } from "./veiculo";
import { Fornecedor } from "./fornecedor"

export interface Servico {
    
    id: string;
    descricao: string;
    fornecedor: Fornecedor;
    veiculo: Veiculo[];

}

export interface ServicoI {

    descricao: string;
    fornecedor: Fornecedor;
    veiculo: Veiculo[];

}