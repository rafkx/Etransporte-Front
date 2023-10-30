import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Peca, PecaI } from 'src/app/models/peca';
import { PecaService } from '../../../services/peca-service/peca.service';

@Injectable({
  providedIn: 'root'
})
export class PecaResolver implements Resolve<Peca | PecaI> {
  
  constructor(private service: PecaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Peca> | Observable<PecaI> {
    if (route.params && route.params['id']) {
      return this.service.getPeca(route.params['id']);
    }
    return of ({
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
    });
  }
}
