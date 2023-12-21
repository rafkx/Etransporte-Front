import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Funcionario, FuncionarioData } from 'src/app/models/funcionario';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { FuncionarioService } from '../../services/funcionario-service/funcionario.service';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { JWTUser } from 'src/app/models/user';
import { AuthService } from 'src/app/public/auth-service/auth.service';


@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  funcionarios: FuncionarioData = {
    data: [],
    meta: {
      take: 0,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false
    }
  };
  user: JWTUser;
  pageEvent!: PageEvent;
  queryField = new FormControl();

  constructor(
    private funcionarioService: FuncionarioService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { 
    this.user = <JWTUser>this.authService.userValue;
  }

  get isAdmin() {
    return this.user?.role === 'admin';
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.funcionarioService.getFuncionariosPaginated(1, 10)
      .pipe(
        map((funcionarioData: FuncionarioData) => this.funcionarios = funcionarioData),
        catchError(error => {
          this.onError('Error ao carregar funcionários')
          return of([])
        })
      ).subscribe();
  }

  onPagination(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    
    page = page +1;
    this.funcionarioService.getFuncionariosPaginated(page, size).pipe(
      map((funcionario: FuncionarioData) => this.funcionarios = funcionario)
    ).subscribe();
  }

  onReset() {
    this.queryField.reset();
    this.refresh();
  }

  onSearch() {
    let value = this.queryField.value ? this.queryField.value : '';
    this.funcionarioService.getFilter(value, 1, 10).subscribe(funcionarios => this.funcionarios = funcionarios);
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  goBack() {
    this.router.navigateByUrl('/private/dashboard')
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(funcionario: Funcionario) {
    this.router.navigate([funcionario.id], { relativeTo: this.route });
  }

  onRemove(funcionario: Funcionario) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse funcionário?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.funcionarioService.remove(funcionario.id).subscribe(
          () => {
            this.refresh()
            this.snackBar.open('Funcionário removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            })
          },
          () => this.onError('Erro ao tentar remover funcionário')
        )
      }
    })
  }

  onRedirect(funcionario: Funcionario) {
    this.router.navigate([`detailed/${funcionario.id}`], { relativeTo: this.route });
  }
}
