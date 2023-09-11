import { Abastecimento } from "./abastecimento";

export interface FileA {

    id: string;
    fileName: string;
    contentLenght: number;
    contentType: string;
    url: string;
    
}

export interface FileAbastecimento extends File {
    abastecimento: Partial<Abastecimento>;
}