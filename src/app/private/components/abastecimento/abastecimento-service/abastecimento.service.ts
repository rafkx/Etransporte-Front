import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';
import { Abastecimento } from 'src/app/models/abastecimento';
import { FileAbastecimento } from 'src/app/models/file_abastecimento';

@Injectable({
  providedIn: 'root'
})
export class AbastecimentoService {

  constructor(
    private http: HttpClient,
  ) { }

  abastecimento: any | undefined;

  public fileUpload (file: FileAbastecimento, url: string) {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('abastecimento', this.abastecimento);
    const request = new HttpRequest('POST', url, formData);
    return this.http.request(request);
  }

  public getFiles(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/files-abastecimento/${id}`);
  }

  public downloadFile(fileName: string) {
    return this.http.get(`http://localhost:3000/files-abastecimento/download/${fileName}`,
    { observe: 'response', responseType: 'blob'});
  }

  public removeFile(fileName: string) {
    return this.http.delete(`http://localhost:3000/files-abastecimento/${fileName}`).pipe(first());
  }

  public getAbastecimentos(): Observable<any> {
    return this.http.get('http://localhost:3000/abastecimento').pipe(first());
  }

  public getAbastecimentoPaginated(page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/abastecimento/paginate', {params});
  }

  public getFilter(data: string, text: string, page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('ano', data);
    params = params.append('text', text);
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/abastecimento/filter', {params})
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
    return this.http.post<Abastecimento>('http://localhost:3000/abastecimento', abastecimento).pipe(
      tap((res: Abastecimento) => this.abastecimento = res.id)
    );
  }

  private update (abastecimento: Partial<Abastecimento>) {
    return this.http.patch<Abastecimento>(`http://localhost:3000/abastecimento/${abastecimento.id}`, abastecimento).pipe(first());
  }

  public remove (id: string) {
    return this.http.delete(`http://localhost:3000/abastecimento/${id}`).pipe(first());
  }
}
