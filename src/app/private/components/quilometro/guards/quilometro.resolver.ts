import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Quilometro, QuilometroI } from 'src/app/models/quilometro';
import { QuilometroService } from '../quilometro-service/quilometro.service';

@Injectable({
  providedIn: 'root'
})
export class QuilometroResolver implements Resolve<Quilometro | QuilometroI> {

  constructor(private service: QuilometroService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Quilometro> | Observable<QuilometroI> {
    if (route.params && route.params['id']) {
      return this.service.getQuilometro(route.params['id']);
    }
    return of({
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
      },
    })
  }
}
