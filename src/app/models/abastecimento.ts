import { Combustivel } from "./combustivel";
import { Quilometro, QuilometroI } from "./quilometro";
import { Veiculo } from "./veiculo";

export interface Abastecimento {

    id: string;
    combustivel: Combustivel;
    quantLitros: number;
    valorLitro: number;
    desconto: number;
    data: string;
    veiculo: Veiculo;
    km: Quilometro;
    
}

export interface AbastecimentoI {

    combustivel: Combustivel;
    quantLitros: number;
    valorLitro: number;
    desconto: number;
    data: string;
    veiculo: Veiculo;
    km: QuilometroI;

}