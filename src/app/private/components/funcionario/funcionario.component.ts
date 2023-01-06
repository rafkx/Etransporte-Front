import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from './model/funcionario';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  funcionario$: Observable<any> | undefined;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.funcionario$ = this.funcionarioService.getFuncionarios();
  }

  refresh() {
    this.funcionario$ = this.funcionarioService.getFuncionarios()
    .pipe(
      catchError(error => {
        this.onError('Error ao carregar funcionários')
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
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
    this.router.navigate([ `detailed/${ funcionario.id }` ], { relativeTo: this.route });
  }
}
