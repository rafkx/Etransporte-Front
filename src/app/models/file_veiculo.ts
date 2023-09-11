import { Veiculo } from "./veiculo";

export interface FileV {

    id: string;
    fileName: string;
    contentLenght: number;
    contentType: string;
    url: string;
    
}

export interface FileVeiculo extends File {
    veiculo: Partial<Veiculo>;
}
