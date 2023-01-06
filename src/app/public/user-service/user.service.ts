import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { UserI } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  public create (user: Partial<UserI>) {
    return this.http.post<UserI>('http://localhost:3000/user', user).pipe(first());
  }
}
