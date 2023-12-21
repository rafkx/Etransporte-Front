import { ItemManutencaoPeca, ItemManutencaoPecaI } from "./item.manutencao.peca";
import { ItemManutencaoServico, ItemManutencaoServicoI } from "./item.manutencao.servico";
import { Quilometro, QuilometroI } from "./quilometro";
import { Veiculo } from "./veiculo";

export interface Manutencao {

    id: string,
    descricao: string,
    data: string,
    km: Quilometro,
    tipo: string,
    veiculo: Veiculo,
    itensPeca: ItemManutencaoPeca[];
    itensServico: ItemManutencaoServico[];
    
}

export interface ManutencaoI {

    descricao: string,
    data: string,
    km: QuilometroI,
    tipo: string,
    veiculo: Veiculo,
    itensPeca: ItemManutencaoPecaI[];
    itensServico: ItemManutencaoServicoI[];

}

export interface ManutencaoData {
    data: Manutencao[],
    meta: {
      take: number;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    }
}