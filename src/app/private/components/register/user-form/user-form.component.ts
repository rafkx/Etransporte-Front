import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from '../../../services/funcionario-service/funcionario.service';
import { UserService } from '../../../services/user-service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  
  form: FormGroup = new FormGroup ({
    name: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')]),
    funcionario: new FormControl(null, [Validators.required])
  });

  funcionarios: Funcionario[] | undefined;
  
  constructor(
    private userService: UserService,
    private funcionarioService: FuncionarioService,
    private snackBar: MatSnackBar,
    private route: Router,
  ) {}

  ngOnInit() {
    this.funcionarioService.getFuncionarios().subscribe(funcionarios => this.funcionarios = funcionarios);
  }

  register() {
    this.userService.create({
      name: this.name.value,
      role: this.role.value,
      email: this.email.value,
      password: this.password.value,
      funcionario: this.funcionario.value
    }).pipe(tap(() => this.route.navigateByUrl('/private/user/list')))
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

  get name(): FormControl{
    return this.form.get('name') as FormControl;
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

  get funcionario(): FormControl{
    return this.form.get('funcionario') as FormControl;
  }
}
