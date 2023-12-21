import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Manutencao } from 'src/app/models/manutencao';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {

  constructor(
    private http: HttpClient,
  ) { }

  public getManutencoes(): Observable<any> {
    return this.http.get('http://localhost:3000/manutencao').pipe(first());
  }

  public getManutencoesPaginated(page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/manutencao/paginate', {params});
  }

  public getFilter(data: string, page: number, take: number): Observable<any> {
    console.log(data)
    let params = new HttpParams();
    params = params.append('data', data);
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/manutencao/filter', { params });
  }

  public getManutencao(id: string) {
    return this.http.get<Manutencao>(`http://localhost:3000/manutencao/${id}`);
  }

  public save (manutencao: Partial<Manutencao>) {
    if (manutencao.id) {
      return this.update(manutencao);
    } 
    return this.create(manutencao);
  }

  private create (manutencao: Partial<Manutencao>) {
    console.log(manutencao);
    return this.http.post<Manutencao>('http://localhost:3000/manutencao', manutencao).pipe(first());
  }

  private update (manutencao: Partial<Manutencao>) {
    return this.http.patch<Manutencao>(`http://localhost:3000/manutencao/${manutencao.id}`, manutencao).pipe(first());
  }

  public remove (id: string) {
    return this.http.delete(`http://localhost:3000/manutencao/${id}`).pipe(first());
  }
}
