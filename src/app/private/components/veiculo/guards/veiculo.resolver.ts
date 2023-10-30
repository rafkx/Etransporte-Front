import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Veiculo, Veiculo2 } from 'src/app/models/veiculo';
import { VeiculoService } from '../../../services/veiculo-service/veiculo.service';

@Injectable({
  providedIn: 'root'
})
export class VeiculoResolver implements Resolve<Veiculo | Veiculo2> {
  
  constructor(private service: VeiculoService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Veiculo> | Observable<Veiculo2> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({
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
    });
  }
}
