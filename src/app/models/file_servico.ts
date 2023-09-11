import { Servico } from "./servico";

export interface FileS {

    id: string;
    fileName: string;
    contentLenght: number;
    contentType: string;
    url: string;
    
}

export interface FileServico extends File {
    servico: Partial<Servico>;
}