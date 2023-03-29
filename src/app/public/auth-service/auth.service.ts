import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponseI } from 'src/app/models/login-response';
import { User, UserI } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  public login (user: Partial<User>): Observable<LoginResponseI> {
    return this.http.post<LoginResponseI>('http://localhost:3000/auth/login', user).pipe(
      tap((res: LoginResponseI) => localStorage.setItem('token', res.token))
    );
  }
}
