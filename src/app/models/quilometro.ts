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

export interface QuilometroData {
    data: Quilometro[],
    meta: {
      take: number;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    }
  };