import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { LoginResponseI } from 'src/app/models/login-response';
import { User, UserI } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>
  public user: Observable<User | null>


  constructor(
    private router: Router,
    private http: HttpClient,
  ) { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  public login (user: Partial<User>) {
    return this.http.post<any>('http://localhost:3000/auth/login', user).pipe(
      map((user => {
        localStorage.setItem('token', user.token);
        this.userSubject.next(user);
        return user;
      }))
    );
  }

  public logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['']);
  }
}
