import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Fornecedor, FornecedorI } from 'src/app/models/fornecedor';
import { FornecedorService } from '../fornecedor-service/fornecedor.service';

@Injectable({
  providedIn: 'root'
})
export class FornecedorResolver implements Resolve<Fornecedor | FornecedorI> {

  constructor(private service: FornecedorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Fornecedor | FornecedorI> {
    if (route.params && route.params['id']) {
      return this.service.getFornecedor(route.params['id']);
    }
    return of({
      nome: '',
      cnpj: '',
      cpf: '',
      endereco: '',
      contatos: [],
    });
  }
}
