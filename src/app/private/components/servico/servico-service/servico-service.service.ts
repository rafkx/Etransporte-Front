import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Servico } from 'src/app/models/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  public fileUpload (files: File[], url: string) {
    const formData = new FormData();
    files.forEach(file => {
      if (file.name.includes('png' || 'jpg')) {
        formData.append('image', file, file.name)
      } else {
        formData.append('file', file, file.name)
      }
    });
    const request = new HttpRequest('POST', url, formData);
    return this.http.request(request);
  }

  public getServicos(): Observable<any> {
    return this.http.get('http://localhost:3000/servico').pipe(first());
  }

  public getFilter(nome: string): Observable<any> {
    return this.http.get('http://localhost:3000/servico/filter', { params: { nome } }).pipe(first());
  }

  public getServico(id: string) {
    return this.http.get<Servico>(`http://localhost:3000/servico/${id}`).pipe(first());
  }

  public save (servico: Partial<Servico>) {
    if (servico.id) {
      return this.update(servico);
    }
    return this.create(servico);
  }

  private create(servico: Partial<Servico>) {
    return this.http.post<Servico>('http://localhost:3000/servico', servico).pipe(first());
  }

  private update(servico: Partial<Servico>) {
    return this.http.patch<Servico>(`http://localhost:3000/servico/${servico.id}`, servico).pipe(first());
  }

  public remove(id: string) {
    return this.http.delete(`http://localhost:3000/servico/${id}`).pipe(first());
  }
}
