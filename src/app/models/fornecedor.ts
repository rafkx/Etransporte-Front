import { Contato } from "./contato";

export interface Fornecedor {

    id: string;
    nome: string;
    cnpj: string;
    cpf?: string;
    endereco: string;
    contatos: Contato[];

}

export interface FornecedorI {

    nome: string;
    cnpj: string;
    cpf?: string;
    endereco: string;
    contatos: Contato[];
    
}