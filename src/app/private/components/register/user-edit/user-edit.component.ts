import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from 'src/app/private/services/user-service/user.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  form: FormGroup = new FormGroup({
    newPassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')]),
    lastPassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')])
  });

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: Router,
  ) { }

  ngOnInit() {

  }

  update() {
    this.userService.updateUser({
      newPassword: this.newPassword.value,
      lastPassword: this.lastPassword.value,
    }).subscribe({ next: (_result => this.onSucces()), error: (_error) => this.onError(_error) });
  }

  onCancel() {
    this.route.navigateByUrl('/private/dashboard');
  }

  private onSucces() {
    this.snackBar.open('Senha alterada com sucesso!', '', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
    this.route.navigateByUrl('/private/dashboard');
  }

  private onError(msgError: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msgError
    });
  }

  get newPassword(): FormControl {
    return this.form.get('newPassword') as FormControl;
  }

  get lastPassword(): FormControl {
    return this.form.get('lastPassword') as FormControl;
  }
}
