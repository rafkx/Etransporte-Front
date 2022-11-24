import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http'
import { Funcionario } from './model/funcionario';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  public getFuncionarios(): Observable<any>{
    return this.http.get('http://localhost:3000/funcionario').pipe(first());
  }

  public loadById(id: string){
    return this.http.get<Funcionario>(`http://localhost:3000/funcionario/${id}`);
  }

  public save (funcionario: Partial<Funcionario>) {
    console.log(funcionario);
    if (funcionario.id) {
      console.log('update');
      return this.update(funcionario);
    }
    console.log('create');
    return this.create(funcionario);
  }

  public create (funcionario: Partial<Funcionario>){
    return this.http.post<Funcionario>('http://localhost:3000/funcionario', funcionario).pipe(first());
  }

  public update (funcionario: Partial<Funcionario>){
    return this.http.patch<Funcionario>(`http://localhost:3000/funcionario/${funcionario.id}`, funcionario).pipe(first());
  }
}
