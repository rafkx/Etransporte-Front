import { Quilometro } from "./quilometro";

export interface FileQ {

    id: string;
    fileName: string;
    contentLenght: number;
    contentType: string;
    url: string;
    
}

export interface FileQuilometro extends File {
    quilometro: Partial<Quilometro>
}