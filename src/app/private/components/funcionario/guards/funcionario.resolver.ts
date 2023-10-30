import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Funcionario, Funcionario2 } from 'src/app/models/funcionario';
import { FuncionarioService } from '../../../services/funcionario-service/funcionario.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioResolver implements Resolve<Funcionario | Funcionario2> {

  constructor(private service: FuncionarioService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Funcionario> | Observable<Funcionario2> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({
      nomeFun: '',
      cpf: '',
      rg: '',
      telefone: '',
      sexoFun: '',
      dataNasciFun: '',
      tituloEleitor: '',
      estadoCivil: '',
      grauInstrucao: '',
      rua: '',
      bairro: '',
      cep: '',
      numero: 0,
      city: '',
      funcao: '',
      salario: 0,
      dataAdmissao: '',
      horarioTrabalho: '',
      intervaloTrabalho: '',
      contratoExpe: 0,
      valeTrans: 0,
      valeAlimen: 0,
      numCarteiraTrab: '',
      serieCarteiraTrab: '',
      estadoCarteiraTrab: '',
    });
  }
}
