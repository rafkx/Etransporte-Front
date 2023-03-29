import { Quilometro, QuilometroI } from "./quilometro";
import { Veiculo } from "./veiculo";

export interface Abastecimento {

    id: string;
    tipoComb: string;
    quantLitros: number;
    valorLitro: number;
    desconto: number;
    data: string;
    veiculo: Veiculo;
    km: Quilometro;
    
}

export interface AbastecimentoI {

    tipoComb: string;
    quantLitros: number;
    valorLitro: number;
    desconto: number;
    data: string;
    veiculo: Veiculo;
    km: QuilometroI;

}