import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { User, UserData } from 'src/app/models/user';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { UserService } from '../../services/user-service/user.service';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  users: UserData = {
    data: [],
    meta: {
      take: 0,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false
    }
  };
  pageEvent!: PageEvent;
  queryField = new FormControl();
  
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  goBack() {
    this.router.navigateByUrl('/private/dashboard')
  }

  refresh() {
    this.userService.getUsersPaginated(1, 10)
      .pipe(
        map((userData: UserData) => this.users = userData),
        catchError(error => {
          this.onError('Error ao carregar users')
          return of([])
        })
      ).subscribe();
      console.log(this.users)
  }

  onPagination(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    
    page = page +1;
    this.userService.getUsersPaginated(page, size).pipe(
      map((users: UserData) => this.users = users)
    ).subscribe();
  }

  onReset() {
    this.queryField.reset();
    this.refresh();
  }

  onSearch() {
    let value = this.queryField.value ? this.queryField.value : '';
    this.userService.getFilter(value, 1, 10).subscribe(users => this.users = users);
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigateByUrl('private/user');
  }

  onRemove(user: User) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse usuario?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.userService.removeUser(user.id).subscribe(
          () => {
            this.refresh()
            this.snackBar.open('Usuario removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            })
          },
          () => this.onError('Erro ao tentar remover Usuario')
        )
      }
    });
  }
  
}
