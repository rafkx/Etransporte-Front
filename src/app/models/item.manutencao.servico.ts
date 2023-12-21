import { ItemManutencao, ItemManutencaoI } from "./item.manutencao";
import { Servico } from "./servico";

export interface ItemManutencaoServico extends ItemManutencao {

    servico: Servico;
    
}

export interface ItemManutencaoServicoI extends ItemManutencaoI {

    servico: Servico;
    
}