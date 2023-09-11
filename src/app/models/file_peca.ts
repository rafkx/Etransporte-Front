import { Peca } from "./peca";

export interface FileP {

    id: string;
    fileName: string;
    contentLenght: number;
    contentType: string;
    url: string;
    
}

export interface FilePeca extends File {
    peca: Partial<Peca>;
}