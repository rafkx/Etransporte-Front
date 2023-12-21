import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Manutencao, ManutencaoI } from 'src/app/models/manutencao';
import { ManutencaoService } from 'src/app/private/services/manutencao-service/manutencao.service';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoResolver implements Resolve<Manutencao | ManutencaoI> {

  constructor(private service: ManutencaoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Manutencao> | Observable<ManutencaoI>{
    if (route.params && route.params['id']) {
      return this.service.getManutencao(route.params['id']);
    }
    return of({
      descricao: '',
      data: '',
      km: {
        quantKm: 0,
        data: '',
        veiculo: {
          id: '',
          placa: '',
          renavam: '',
          chassi: '',
          tipoChassi: '',
          ano: 0,
          modelo: '',
          marca: '',
          combustivel: {
            id: '',
            nome: '',
          },
          ultimaKm: 0,
          corInterna: '',
          corExterna: '',
          numMotorInterno: 0,
          numMotorExterno: 0,
          rastreador: false,
          bloqueador: false,
          dataAquisicao: '',
          condicao: '',
          valorCompra: 0,
          ValorReforma: 0,
          valorMercado: 0,
          nomeVendedor: '',
          teleVendedor: '',
          descricao: '',
        }
      },
      tipo: '',
      veiculo: {
        id: '',
        placa: '',
        renavam: '',
        chassi: '',
        tipoChassi: '',
        ano: 0,
        modelo: '',
        marca: '',
        combustivel: {
          id: '',
          nome: '',
        },
        ultimaKm: 0,
        corInterna: '',
        corExterna: '',
        numMotorInterno: 0,
        numMotorExterno: 0,
        rastreador: false,
        bloqueador: false,
        dataAquisicao: '',
        condicao: '',
        valorCompra: 0,
        ValorReforma: 0,
        valorMercado: 0,
        nomeVendedor: '',
        teleVendedor: '',
        descricao: '',
      },
      itensPeca: [{
        descricao: '',
        prazoKm: 0,
        prazoMeses: 0,
        valor: 0,
        fornecedor: {
          id: '',
          nome: '',
          cnpj: '',
          cpf: '',
          endereco: '',
          contatos: [],
        },
        peca: {
          id: '',
          nomePeca: '',
          codPeca: '',
          descricao: '',
          marcaFabricante: '',
          modelo: '',
          pequenaPeca: [],
          fornecedorP: {
            id: '',
            nome: '',
            cnpj: '',
            cpf: '',
            endereco: '',
            contatos: [{
              id: '',
              nome: '',
              apelido: '',
              telefone: '',
              email: '',
            }],
          },
          veiculo: [{
            id: '',
            placa: '',
            renavam: '',
            chassi: '',
            tipoChassi: '',
            ano: 0,
            modelo: '',
            marca: '',
            combustivel: {
              id: '',
              nome: '',
            },
            ultimaKm: 0,
            corInterna: '',
            corExterna: '',
            numMotorInterno: 0,
            numMotorExterno: 0,
            rastreador: false,
            bloqueador: false,
            dataAquisicao: '',
            condicao: '',
            valorCompra: 0,
            ValorReforma: 0,
            valorMercado: 0,
            nomeVendedor: '',
            teleVendedor: '',
            descricao: '',
          }],
        }
      }],
      itensServico: [{
        descricao: '',
        prazoKm: 0,
        prazoMeses: 0,
        valor: 0,
        fornecedor: {
          id: '',
          nome: '',
          cnpj: '',
          cpf: '',
          endereco: '',
          contatos: [],
        },
        servico: {
          id: '',
          descricao: '',
          cod: '',
          fornecedor: [{
            id: '',
            nome: '',
            cnpj: '',
            cpf: '',
            endereco: '',
            contatos: [{
              id: '',
              nome: '',
              apelido: '',
              telefone: '',
              email: '',
            }],
          }],
          veiculo: [{
            id: '',
            placa: '',
            renavam: '',
            chassi: '',
            tipoChassi: '',
            ano: 0,
            modelo: '',
            marca: '',
            combustivel: {
              id: '',
              nome: '',
            },
            ultimaKm: 0,
            corInterna: '',
            corExterna: '',
            numMotorInterno: 0,
            numMotorExterno: 0,
            rastreador: false,
            bloqueador: false,
            dataAquisicao: '',
            condicao: '',
            valorCompra: 0,
            ValorReforma: 0,
            valorMercado: 0,
            nomeVendedor: '',
            teleVendedor: '',
            descricao: '',
          }]
        }
      }],
    });
  }
}
