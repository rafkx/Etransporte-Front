import { Injectable } from '@angular/core';
import { delay, first, Observable, tap } from 'rxjs';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { FileFuncionario } from 'src/app/models/file_funcionario';
import { Funcionario } from 'src/app/models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(
    private http: HttpClient,
  ) { }

  funcionario: any | undefined;

  public fileUpload(files: FileFuncionario[], url: string) {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file));
    formData.append('funcionario', this.funcionario);
    const request = new HttpRequest('POST', url, formData);
    return this.http.request(request);
  }

  public getFiles(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/files-funcionario/${id}`);
  }

  public downloadFile(fileName: string) {
    return this.http.get(`http://localhost:3000/files-funcionario/download/${fileName}`,
    { observe: 'response', responseType: 'blob'});
  }

  public removeFile(fileName: string) {
    return this.http.delete(`http://localhost:3000/files-funcionario/${fileName}`).pipe(first());
  }

  public getFuncionarios(): Observable<any>{
    return this.http.get('http://localhost:3000/funcionario').pipe(first());
  }

  public getFuncionariosPaginated(page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/funcionario/paginate', { params });
  }

  public getFilter(text: string, page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('text', text);
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/funcionario/filter', { params });
  }

  public loadById(id: string){
    return this.http.get<Funcionario>(`http://localhost:3000/funcionario/${id}`);
  }

  public save (funcionario: Partial<Funcionario>) {
    if (funcionario.id) {
      return this.update(funcionario);
    }
    return this.create(funcionario);
  }

  private create (funcionario: Partial<Funcionario>){
    return this.http.post<Funcionario>('http://localhost:3000/funcionario', funcionario).pipe(
      tap((res: Funcionario) => this.funcionario = res.id)
    );
  }

  private update (funcionario: Partial<Funcionario>){
    return this.http.patch<Funcionario>(`http://localhost:3000/funcionario/${funcionario.id}`, funcionario).pipe(first());
  }

  public remove(id: string) {
    return this.http.delete(`http://localhost:3000/funcionario/${id}`).pipe(first());
  }
}
