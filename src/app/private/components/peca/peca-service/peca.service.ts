import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Peca } from 'src/app/models/peca';

@Injectable({
  providedIn: 'root'
})
export class PecaService {

  constructor(
    private http: HttpClient
  ) { }

  public getPecas(): Observable<any> {
    return this.http.get('http://localhost:3000/pecas').pipe(first());
  }

  public getPeca(id: string){
    return this.http.get<Peca>(`http://localhost:3000/pecas/${id}`).pipe(first());
  }

  public save (peca: Partial<Peca>){
    if (peca.id) {
      return this.update(peca);
    }
    return this.create(peca);
  }

  private create (peca: Partial<Peca>){
    return this.http.post<Peca>('http://localhost:3000/pecas', peca).pipe(first());
  }

  private update (peca: Partial<Peca>){
    return this.http.patch<Peca>(`http://localhost:3000/pecas/${peca.id}`, peca).pipe(first());
  }

  public remove (id: string){
    return this.http.delete(`http://localhost:3000/pecas/${id}`).pipe(first());
  }
}
