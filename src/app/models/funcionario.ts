import { Veiculo } from './veiculo';

export interface Funcionario {
  id: string;
  nomeFun: string;
  cpf: string;
  rg: string;
  telefone?: string;
  sexoFun?: string;
  dataNasciFun: string;
  tituloEleitor?: string;
  estadoCivil?: string;
  grauInstrucao?: string;
  rua?: string;
  bairro?: string;
  cep?: string;
  numero?: number;
  city?: string;
  funcao: string;
  salario: number;
  dataAdmissao: string;
  horarioTrabalho?: string;
  intervaloTrabalho?: string;
  contratoExpe?: number;
  valeTrans?: number;
  valeAlimen?: number;
  numCarteiraTrab?: string;
  serieCarteiraTrab?: string;
  estadoCarteiraTrab?: string;
  fotoPerfil?: string | ArrayBuffer | null;
}

export interface Funcionario2 {
  nomeFun: string;
  cpf: string;
  rg: string;
  telefone?: string;
  sexoFun?: string;
  dataNasciFun: string;
  tituloEleitor?: string;
  estadoCivil?: string;
  grauInstrucao?: string;
  rua?: string;
  bairro?: string;
  cep?: string;
  numero?: number;
  city?: string;
  funcao: string;
  salario: number;
  dataAdmissao: string;
  horarioTrabalho?: string;
  intervaloTrabalho?: string;
  contratoExpe?: number;
  valeTrans?: number;
  valeAlimen?: number;
  numCarteiraTrab?: string;
  serieCarteiraTrab?: string;
  estadoCarteiraTrab?: string;
}

export interface FuncionarioData {
  data: Funcionario[];
  meta: {
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
