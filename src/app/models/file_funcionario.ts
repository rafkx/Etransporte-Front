import { Funcionario } from "./funcionario";

export interface FileF {

    id: string;
    fileName: string;
    contentLenght: number;
    contentType: string;
    url: string;
    
}

export interface FileFuncionario extends File {
    funcionario: Partial<Funcionario>;
}