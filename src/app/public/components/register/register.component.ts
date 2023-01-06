import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CustomValidator } from '../../helpers/custom-validator';
import { UserService } from '../../user-service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  form: FormGroup = new FormGroup ({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])
  });
  
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private route: Router,
  ) {}

  ngOnInit(): void {
  }

  register() {
    this.userService.create({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      role: this.role.value,
      email: this.email.value,
      password: this.password.value
    }).pipe(tap(() => this.route.navigate(['../login'])))
    .subscribe({ next: (_result => this.onSucces()), error: (_error => this.onError()) });

  }

  private onSucces() {
    this.snackBar.open('Usuário criado com sucesso!', '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }  

  private onError() {
    this.snackBar.open('Erro ao criar usuário!', '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    })
  }

  get firstName(): FormControl{
    return this.form.get('firstName') as FormControl;
  }

  get lastName(): FormControl{
    return this.form.get('lastName') as FormControl;
  }

  get role(): FormControl{
    return this.form.get('role') as FormControl;
  }

  get email(): FormControl{
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl{
    return this.form.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl{
    return this.form.get('passwordConfirm') as FormControl;
  }

}
