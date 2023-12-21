import { Funcionario } from "./funcionario";
import { Veiculo } from "./veiculo";

export interface AutorizacaoVeiculo {

    funcionario: Funcionario,
    veiculo: Veiculo,
}