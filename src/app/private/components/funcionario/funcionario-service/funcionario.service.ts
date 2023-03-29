import { Injectable } from '@angular/core';
import { delay, first, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from 'src/app/models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(
    private http: HttpClient,
  ) { }

  public getFuncionarios(): Observable<any>{
    return this.http.get('http://localhost:3000/funcionario').pipe(first()
    //, delay(5000)
    );
  }

  public loadById(id: string){
    return this.http.get<Funcionario>(`http://localhost:3000/funcionario/${id}`);
  }

  public save (funcionario: Partial<Funcionario>) {
    if (funcionario.id) {
      return this.update(funcionario);
    }
    return this.create(funcionario);
  }

  private create (funcionario: Partial<Funcionario>){
    return this.http.post<Funcionario>('http://localhost:3000/funcionario', funcionario).pipe(first());
  }

  private update (funcionario: Partial<Funcionario>){
    return this.http.patch<Funcionario>(`http://localhost:3000/funcionario/${funcionario.id}`, funcionario).pipe(first());
  }

  public remove(id: string) {
    return this.http.delete(`http://localhost:3000/funcionario/${id}`).pipe(first());
  }
}
