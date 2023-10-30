import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Abastecimento, AbastecimentoI } from 'src/app/models/abastecimento';
import { AbastecimentoService } from '../../../services/abastecimento-service/abastecimento.service';

@Injectable({
  providedIn: 'root'
})
export class AbastecimentoResolver implements Resolve<Abastecimento | AbastecimentoI> {

  constructor(private service: AbastecimentoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Abastecimento> | Observable<AbastecimentoI> {
    if (route.params && route.params['id']) {
      return this.service.getAbastecimento(route.params['id']);
    }
    return of({
      combustivel: {
        id: '', 
        nome: '',
      },
      quantLitros: 0,
      valorLitro: 0,
      desconto: 0,
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
          nome: ''
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
      }
    })
  }
}
