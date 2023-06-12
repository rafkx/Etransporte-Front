import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { FornecedorService } from './fornecedor-service/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Fornecedor } from 'src/app/models/fornecedor';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

  fornecedor$: Observable<any> | undefined;

  constructor(
    private fornecedorService: FornecedorService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.fornecedor$ = this.fornecedorService.getFornecedores();
  }

  refresh() {
    this.fornecedor$ = this.fornecedorService.getFornecedores()
    .pipe(
      catchError(error => {
        this.onError('Error ao carregar fornecedores')
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

  onEdit(fornecedor: Fornecedor) {
    this.router.navigate([fornecedor.id], { relativeTo: this.route });
  }

  onRemove(fornecedor: Fornecedor) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover o fornecedor?',
    })

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.fornecedorService.remove(fornecedor.id).subscribe(
          () => {
            this.refresh()
            this.snackBar.open('Fornecedor removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            })
          }, 
          () => this.onError('Erro ao tentar remover fornecedor')
        )
      }
    })
  }

  onRedirect (fornecedor: Fornecedor) {
    this.router.navigate([`detailed/${fornecedor.id}`], { relativeTo: this.route })
  }

}
