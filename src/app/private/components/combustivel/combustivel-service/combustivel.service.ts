import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Combustivel } from 'src/app/models/combustivel';

@Injectable({
  providedIn: 'root'
})
export class CombustivelService {

  constructor(
    private http: HttpClient,
  ) { }

  public getCombustiveis(): Observable<any> {
    return this.http.get('http://localhost:3000/combustivel').pipe(first());
  }

  public getCombustivel(id: string) {
    return this.http.get<Combustivel>(`http://localhost:3000/combustivel/${id}`).pipe(first());
  } 

  public save (combustivel: Partial<Combustivel>) {
    if (combustivel.id) {
      return this.update(combustivel);
    }
    return this.create(combustivel);
  }

  private create (combustivel: Partial<Combustivel>) {
    return this.http.post<Combustivel>('http://localhost:3000/combustivel', combustivel).pipe(first());
  }

  private update (combustivel: Partial<Combustivel>) {
    return this.http.patch<Combustivel>(`http://localhost:3000/combustivel/${combustivel.id}`, combustivel).pipe(first());
  }

  public remove (id: string) {
    return this.http.delete(`http://localhost:3000/combustivel/${id}`).pipe(first());
  }
}
