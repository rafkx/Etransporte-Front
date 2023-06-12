import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Contato } from 'src/app/models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(
    private http: HttpClient,
  ) { }

  public getContatos(): Observable<any> {
    return this.http.get('http://localhost:3000/contato').pipe(first());
  }

  public getContato(id: string) {
    return this.http.get<Contato>(`http://localhost:3000/contato/${id}`).pipe(first());
  }

  public save (contato: Partial<Contato>) {
    if (contato.id) {
      return this.update(contato);
    } 
    return this.create(contato);
  }

  private update(contato: Partial<Contato>) {
    return this.http.patch<Contato>(`http://localhost:3000/contato/${contato.id}`, contato).pipe(first());
  }

  private create(contato: Partial<Contato>) {
    return this.http.post<Contato>(`http://localhost:3000/contato`, contato).pipe(first());
  }

  public remove (id: string) {
    return this.http.delete(`http://localhost:3000/contato/${id}`).pipe(first());
  }
}
