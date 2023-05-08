import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Veiculo } from 'src/app/models/veiculo';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  constructor(
    private http: HttpClient,
  ) { }

  public fileUpload(files: File[], url: string) {
    const formData = new FormData();
    files.forEach(file => {
      if (file.name.includes('png' || 'jpg')) {
        formData.append('image', file, file.name)
      } else {
        formData.append('file', file, file.name)
      }
    });
    const request = new HttpRequest('POST', url, formData);
    console.log(files)
    return this.http.request(request);
  }

  public getVeiculos(): Observable<any> {
    return this.http.get('http://localhost:3000/veiculo').pipe(first());
  }

  public getFilter(placa: string): Observable<any> {
    return this.http.get('http://localhost:3000/veiculo/filter', { params: { placa } }).pipe(first());
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
    console.log(veiculo);
    return this.http.post<Veiculo>('http://localhost:3000/veiculo', veiculo).pipe(first());
  }

  private update (veiculo: Partial<Veiculo>) {
    return this.http.patch<Veiculo>(`http://localhost:3000/veiculo/${veiculo.id}`, veiculo).pipe(first());
  }

  public remove (id: string) {
    return this.http.delete(`http://localhost:3000/veiculo/${id}`).pipe(first());
  }
  
}
