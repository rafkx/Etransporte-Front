import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponseI } from '../model/login-response';
import { UserI } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  public login (user: Partial<UserI>): Observable<LoginResponseI> {
    return this.http.post<LoginResponseI>('http://localhost:3000/auth/login', user).pipe(
      tap((res: LoginResponseI) => localStorage.setItem('token', res.token))
    );
  }
}
