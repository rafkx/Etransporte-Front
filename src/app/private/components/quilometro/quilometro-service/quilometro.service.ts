import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';
import { FileQuilometro } from 'src/app/models/file_quilometro';
import { Quilometro } from 'src/app/models/quilometro';

@Injectable({
  providedIn: 'root'
})
export class QuilometroService {

  constructor(
    private http: HttpClient,
  ) { }

  quilometro: any | undefined;

  public fileUpload (file: FileQuilometro, url: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('quilometro', this.quilometro);
    const request = new HttpRequest('POST', url, formData);
    return this.http.request(request);
  }

  public getFiles(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/files-quilometro/${id}`)
  }

  public downloadFile(fileName: string) {
    return this.http.get(`http://localhost:3000/files-quilometro/download/${fileName}`,
    { observe: 'response', responseType: 'blob' });
  }

  public removeFile(fileName: string) {
    return this.http.delete(`http://localhost:3000/files-quilometro/${fileName}`).pipe(first());
  }

  public getQuilometros(): Observable<any> {
    return this.http.get('http://localhost:3000/quilometro').pipe(first());
  }

  public getQuilometrosPaginated(page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/quilometro/paginate', { params });
  }

  public getFilter(data: string, text: string, page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('data', data);
    params = params.append('text', text);
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/quilometro/filter', { params });
  }

  public getQuilometro(id: string) {
    return this.http.get<Quilometro>(`http://localhost:3000/quilometro/${id}`).pipe(first());
  }

  public save (quilometro: Partial<Quilometro>) {
    if (quilometro.id) {
      return this.update(quilometro);
    }
    return this.create(quilometro);
  }

  private create (quilometro: Partial<Quilometro>){
    return this.http.post<Quilometro>('http://localhost:3000/quilometro', quilometro).pipe(
      tap((res: Quilometro) => this.quilometro = res.id)
    );
  }

  private update (quilometro: Partial<Quilometro>){
    return this.http.patch<Quilometro>(`http://localhost:3000/quilometro/${quilometro.id}`, quilometro).pipe(first());
  }
  
  public remove(id: string){
    return this.http.delete(`http://localhost:3000/quilometro/${id}`).pipe(first());
  }
}
