import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Quilometro } from 'src/app/models/quilometro';

@Injectable({
  providedIn: 'root'
})
export class QuilometroService {

  constructor(
    private http: HttpClient,
  ) { }

  public fileUpload (file: File, url: string) {
    const formData = new FormData();
    formData.append('file', file, file.name)
    //console.log(file)
    //formData.set('file', file)
    //console.log(formData)
    return this.http.post(url, formData)
  }

  public getQuilometros(): Observable<any> {
    return this.http.get('http://localhost:3000/quilometro').pipe(first());
  }

  public getFilter(data: string, text: string): Observable<any> {
    if (text !== null && data !== null) {
      return this.http.get('http://localhost:3000/quilometro/filter', { params: { data, text } });
    } else if (data && data !== null) {
      return this.http.get('http://localhost:3000/quilometro/filter', { params: { data: data } });
    } else {
      return this.http.get('http://localhost:3000/quilometro/filter', { params: { text: text } });
    }
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
    return this.http.post<Quilometro>('http://localhost:3000/quilometro', quilometro).pipe(first());
  }

  private update (quilometro: Partial<Quilometro>){
    return this.http.patch<Quilometro>(`http://localhost:3000/quilometro/${quilometro.id}`, quilometro).pipe(first());
  }
  
  public remove(id: string){
    return this.http.delete(`http://localhost:3000/quilometro/${id}`).pipe(first());
  }
}
