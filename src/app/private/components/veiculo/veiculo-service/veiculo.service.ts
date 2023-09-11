import { HttpClient, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable, pipe, tap } from 'rxjs';
import { FileVeiculo } from 'src/app/models/file_veiculo';
import { Veiculo, VeiculoData } from 'src/app/models/veiculo';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  constructor(
    private http: HttpClient,
  ) { }

  veiculo: any | undefined;

  public fileUpload(files: FileVeiculo[], url: string) {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file));
    formData.append('veiculo', this.veiculo);
    const request = new HttpRequest('POST', url, formData);
    return this.http.request(request);
  }

  public getFiles(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/files-veiculo/${id}`);
  }

  public downloadFile(fileName: string) {
    return this.http.get(`http://localhost:3000/files-veiculo/download/${fileName}`, 
    { observe: 'response', responseType: 'blob' });
  }

  public removeFile(fileName: string) {
    return this.http.delete(`http://localhost:3000/files-veiculo/${fileName}`).pipe(first());
  }

  public getVeiculos(): Observable<any> {
    return this.http.get('http://localhost:3000/veiculo').pipe(first());
  }

  public getVeiculosPaginated(page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/veiculo/paginate', {params});
  }

  public getFilter(ano: number, text: string, page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('ano', ano);
    params = params.append('text', text);
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/veiculo/filter', { params });
  }

  public loadById(id: string) {
    return this.http.get<Veiculo>(`http://localhost:3000/veiculo/${id}`);
  }

  public save (veiculo: Partial<Veiculo>) {
    if (veiculo.id) {
      return this.update(veiculo);
    }
    return this.create(veiculo);
  }

  private create (veiculo: Partial<Veiculo>) {
    return this.http.post<Veiculo>('http://localhost:3000/veiculo', veiculo).pipe(
      tap((res: Veiculo) => this.veiculo = res.id)
      );
  }

  private update (veiculo: Partial<Veiculo>) {
    return this.http.patch<Veiculo>(`http://localhost:3000/veiculo/${veiculo.id}`, veiculo).pipe(first());
  }

  public remove (id: string) {
    return this.http.delete(`http://localhost:3000/veiculo/${id}`).pipe(first());
  }
  
}
