import { Veiculo } from "./veiculo";

export interface Quilometro {

    id: string;
    quantKm: number;
    data: string;
    veiculo: Veiculo

}

export interface QuilometroI {

    quantKm: number;
    data: string;
    veiculo: Veiculo

}