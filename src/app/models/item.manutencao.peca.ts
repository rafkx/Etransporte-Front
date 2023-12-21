import { ItemManutencao, ItemManutencaoI } from "./item.manutencao";
import { Manutencao } from "./manutencao";
import { Peca } from "./peca";

export interface ItemManutencaoPeca extends ItemManutencao {

    peca: Peca

}

export interface ItemManutencaoPecaI extends ItemManutencaoI {

    peca: Peca

}