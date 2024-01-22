import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable, tap } from 'rxjs';
import { FilePeca } from 'src/app/models/file_peca';
import { Peca } from 'src/app/models/peca';

@Injectable({
  providedIn: 'root'
})
export class PecaService {

  constructor(
    private http: HttpClient
  ) { }

  peca: any | undefined;

  public fileUpload(files: FilePeca[], url: string) {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));
    formData.append('peca', this.peca);
    const request = new HttpRequest('POST', url, formData);
    return this.http.request(request);
  }

  public getFiles(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/files-peca/${id}`);
  }

  public downloadFile(fileName: string) {
    return this.http.get(`http://localhost:3000/files-peca/download/${fileName}`,
    { observe: 'response', responseType: 'blob' });
  }

  public removeFile(fileName: string) {
    return this.http.delete(`http://localhost:3000/files-peca/${fileName}`).pipe(first());
  }

  public addPhoto(id: string, photo: File) {
    console.log(photo);
    const formData2 = new FormData();
    formData2.append('photo', photo);
    return this.http.post(`http://localhost:3000/pecas/photo/${id}`, formData2);
  }

  public getPecas(): Observable<any> {
    return this.http.get('http://localhost:3000/pecas').pipe(first());
  }

  public getPecasPaginated(page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/pecas/paginate', { params });
  }

  public getFilter(text: string, page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('text', text);
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/pecas/filter', { params }).pipe();
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
    return this.http.post<Peca>('http://localhost:3000/pecas', peca).pipe(
      tap((res: Peca) => this.peca = res.id)
    );
  }

  private update (peca: Partial<Peca>){
    return this.http.patch<Peca>(`http://localhost:3000/pecas/${peca.id}`, peca).pipe(first());
  }

  public remove (id: string){
    return this.http.delete(`http://localhost:3000/pecas/${id}`).pipe(first());
  }
}
