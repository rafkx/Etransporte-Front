import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Abastecimento } from 'src/app/models/abastecimento';

@Injectable({
  providedIn: 'root'
})
export class AbastecimentoService {

  constructor(
    private http: HttpClient,
  ) { }

  public getAbastecimentos(): Observable<any> {
    return this.http.get('http://localhost:3000/abastecimento').pipe(first());
  }

  public getAbastecimento(id: string) {
    return this.http.get<Abastecimento>(`http://localhost:3000/abastecimento/${id}`).pipe(first());
  }

  public save (abastecimento: Partial<Abastecimento>) {
    if (abastecimento.id){
      return this.update(abastecimento);
    }
    return this.create(abastecimento);
  }

  private create (abastecimento: Partial<Abastecimento>) {
    return this.http.post<Abastecimento>('http://localhost:3000/abastecimento', abastecimento).pipe(first());
  }

  private update (abastecimento: Partial<Abastecimento>) {
    return this.http.patch<Abastecimento>(`http://localhost:3000/abastecimento/${abastecimento.id}`, abastecimento).pipe(first());
  }

  public remove (id: string) {
    return this.http.delete(`http://localhost:3000/abastecimento/${id}`).pipe(first());
  }
}
