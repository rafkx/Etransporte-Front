import { Component, OnInit } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { FornecedorService } from '../../services/fornecedor-service/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Fornecedor, FornecedorData } from 'src/app/models/fornecedor';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { JWTUser } from 'src/app/models/user';
import { AuthService } from 'src/app/public/auth-service/auth.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

  fornecedores: FornecedorData = {
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
    private fornecedorService: FornecedorService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.user = <JWTUser>this.authService.userValue;
   }

  ngOnInit() {
    this.refresh();
  }

  get isAdmin() {
    return this.user.role === 'admin';
  }

  get isGerente() {
    return this.user.role === 'gerente';
  }

  refresh() {
    this.fornecedorService.getFornecedoresPaginated(1, 10)
    .pipe(
      map((fornecedorData: FornecedorData) => this.fornecedores = fornecedorData),
      catchError(error => {
        this.onError('Error ao carregar fornecedores')
        return of([])
      })
    ).subscribe();
  }

  onPagination(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page +1;
    this.fornecedorService.getFornecedoresPaginated(page, size).pipe(
      map((fornecedores: FornecedorData) => this.fornecedores = fornecedores)
    ).subscribe();
  }

  onSearch() {
    let value = this.queryField.value ? this.queryField.value : '';
    this.fornecedorService.getFilter(value, 1, 10).subscribe(fornecedores => this.fornecedores = fornecedores);
  }

  onReset() {
    this.queryField.reset();
    this.refresh();
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
