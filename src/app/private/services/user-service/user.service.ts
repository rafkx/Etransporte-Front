import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { UserI, User, UserUpdatePassword } from 'src/app/models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  public create (user: Partial<User>) {
    return this.http.post<User>('http://localhost:3000/user', user).pipe(first());
  }

  public getUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/user').pipe(first());
  }

  public getUsersPaginated(page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/user/paginate', { params });
  }

  public getFilter(text: string, page: number, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('text', text);
    params = params.append('page', String(page));
    params = params.append('take', String(take));
    return this.http.get('http://localhost:3000/user/filter', { params });
  }

  public getUser(id: string) {
    return this.http.get<User>(`http://localhost:3000/user/${id}`).pipe(first());
  }

  public updateUser(userUpdatePassword: Partial<UserUpdatePassword>) {
    return this.http.patch<UserUpdatePassword>('http://localhost:3000/user', userUpdatePassword).pipe(first());
  }

  public removeUser(id: string) {
    return this.http.delete(`http://localhost:3000/user/${id}`).pipe(first());
  }

  
}
