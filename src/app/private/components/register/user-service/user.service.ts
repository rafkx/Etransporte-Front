import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { UserI, User } from 'src/app/models/user';


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

  public getUser(id: string) {
    return this.http.get<User>(`http://localhost:3000/user/${id}`).pipe(first());
  }

  public removeUser(id: string) {
    return this.http.delete(`http://localhost:3000/user/${id}`).pipe(first());
  }
}
