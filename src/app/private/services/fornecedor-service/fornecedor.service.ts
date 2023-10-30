import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Fornecedor } from 'src/app/models/fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(
    private http: HttpClient,
  ) { }

  public getFornecedores(): Observable<any> {
    return this.http.get('http://localhost:3000/fornecedor').pipe(first());
  }

  public getFornecedoresPaginated(page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/fornecedor/paginate', {params});
  }

  public getFilter(text: string, page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('text', text);
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/fornecedor/filter', {params});
  }

  public getFornecedor(id: string) {
    return this.http.get<Fornecedor>(`http://localhost:3000/fornecedor/${id}`).pipe(first());
  }

  public save (fornecedor: Partial<Fornecedor>) {
    if (fornecedor.id) {
      return this.update(fornecedor);
    }
    return this.create(fornecedor);
  }

  private create(fornecedor: Partial<Fornecedor>) {
    return this.http.post<Fornecedor>('http://localhost:3000/fornecedor', fornecedor).pipe(first());
  }

  private update(fornecedor: Partial<Fornecedor>) {
    return this.http.patch<Fornecedor>(`http://localhost:3000/fornecedor/${fornecedor.id}`, fornecedor).pipe(first());
  }

  public remove (id: string) {
    return this.http.delete(`http://localhost:3000/fornecedor/${id}`).pipe(first());
  }
}
