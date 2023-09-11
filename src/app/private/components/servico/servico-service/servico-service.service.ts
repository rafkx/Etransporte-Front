import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';
import { FileServico } from 'src/app/models/file_servico';
import { Servico } from 'src/app/models/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  servico: any | undefined;

  public fileUpload (files: FileServico[], url: string) {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file));
    formData.append('servico', this.servico);
    const request = new HttpRequest('POST', url, formData);
    return this.http.request(request);
  }

  public getFiles(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/files-servico/${id}`)
  }

  public downloadfile(fileName: string) {
    return this.http.get(`http://localhost:3000/files-servico/download/${fileName}`, 
    { observe: 'response', responseType: 'blob'});
  }

  public removeFile(fileName: string) {
    return this.http.delete(`http://localhost:3000/files-servico/${fileName}`).pipe(first());
  }

  public getServicos(): Observable<any> {
    return this.http.get('http://localhost:3000/servico').pipe(first());
  }

  public getServicosPaginated(page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/servico/paginate', { params });
  }

  public getFilter(text: string, page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('text', text);
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/servico/filter', { params});
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
    return this.http.post<Servico>('http://localhost:3000/servico', servico).pipe(
      tap((res: Servico) => this.servico = res.id)
    );
  }

  private update(servico: Partial<Servico>) {
    return this.http.patch<Servico>(`http://localhost:3000/servico/${servico.id}`, servico).pipe(first());
  }

  public remove(id: string) {
    return this.http.delete(`http://localhost:3000/servico/${id}`).pipe(first());
  }
}
