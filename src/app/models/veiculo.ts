import { Combustivel } from './combustivel';

export interface Veiculo {
  id: string;
  placa: string;
  renavam: string;
  chassi: string;
  tipoChassi: string;
  ano: number;
  modelo: string;
  marca: string;
  combustivel: Combustivel;
  ultimaKm: number;
  corInterna?: string;
  corExterna?: string;
  numMotorInterno?: number;
  numMotorExterno?: number;
  rastreador?: boolean;
  bloqueador?: boolean;
  dataAquisicao: string;
  condicao: string;
  valorCompra: number;
  ValorReforma?: number;
  valorMercado: number;
  nomeVendedor: string;
  teleVendedor: string;
  descricao: string;
  fotoCarro?: string | ArrayBuffer | null;
}

export interface Veiculo2 {
  placa: string;
  renavam: string;
  chassi: string;
  tipoChassi: string;
  ano: number;
  modelo: string;
  marca: string;
  combustivel: Combustivel;
  ultimaKm: number;
  corInterna?: string;
  corExterna?: string;
  numMotorInterno?: number;
  numMotorExterno?: number;
  rastreador?: boolean;
  bloqueador?: boolean;
  dataAquisicao: string;
  condicao: string;
  valorCompra: number;
  ValorReforma?: number;
  valorMercado: number;
  nomeVendedor: string;
  teleVendedor: string;
  descricao: string;
}

export interface VeiculoData {
  data: Veiculo[];
  meta: {
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
