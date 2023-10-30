import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import jtw from 'jwt-decode';
import { LoginResponseI } from 'src/app/models/login-response';
import { JWTUser, User, UserI } from 'src/app/models/user';
import { UserService } from 'src/app/private/services/user-service/user.service';

const TOKEN_KEY : string = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<JWTUser | null> = new BehaviorSubject<JWTUser | null>(null);
  public user: Observable<JWTUser | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    const token = this.getToken();
    if (token != null) {
      this.userSubject.next(this.decodeToken(token));
    }
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  public login (user: Partial<User>) {
    return this.http.post<any>('http://localhost:3000/auth/login', user).pipe(
      map((user => {
        this.setToken(user.token);
        this.userSubject.next(this.decodeToken(user.token));
        console.log(user);
        return user;
      }))
    );
  }

  public decodeToken(token: string): JWTUser {
    const jwtUser = jtw(token) as JWTUser;
    console.log(jwtUser);
    return jwtUser;
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY); 
  }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  public logout() {
    this.removeToken();
    this.userSubject.next(null);
    this.router.navigate(['']);
  }
}
