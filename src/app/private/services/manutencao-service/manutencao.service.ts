import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Manutencao, ManutencaoI } from 'src/app/models/manutencao';

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

  public create (manutencao: Partial<ManutencaoI>) {
    console.log(manutencao);
    return this.http.post<ManutencaoI>('http://localhost:3000/manutencao', manutencao).pipe(first());
  }

  public update (manutencao: Partial<Manutencao>) {
    return this.http.patch<Manutencao>(`http://localhost:3000/manutencao/${manutencao.id}`, manutencao).pipe(first());
  }

  public remove (id: string) {
    return this.http.delete(`http://localhost:3000/manutencao/${id}`).pipe(first());
  }
}
