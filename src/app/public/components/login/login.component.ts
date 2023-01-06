import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: Router,
  ) { }

  login() {
    this.authService.login({
      email: this.email.value,
      password: this.password.value
    }).pipe(tap(() => this.route.navigate(['../../private/dashboard'])))
    .subscribe({ next: (_result => this.onSucces()), error: (_error => this.onError()) });
  }

  private onSucces() {
    this.snackBar.open('Login efetuado com sucesso!', '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  private onError() {
    this.snackBar.open('Erro ao entrar!', '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    })
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
}
