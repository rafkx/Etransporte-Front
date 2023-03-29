import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Servico, ServicoI } from 'src/app/models/servico';
import { ServicoServiceService } from '../servico-service/servico-service.service';

@Injectable({
  providedIn: 'root'
})
export class ServicoResolver implements Resolve<Servico | ServicoI> {
  
  constructor(private service: ServicoServiceService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Servico> | Observable<ServicoI> {
    if (route.params && route.params['id']) {
      return this.service.getServico(route.params['id']);
    }
    return of ({
      descricao: '',
      fornecedor: {
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
        combustivel: '',
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
