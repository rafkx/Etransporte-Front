import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Quilometro, QuilometroData } from 'src/app/models/quilometro';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { QuilometroService } from '../../services/quilometro-service/quilometro.service';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { JWTUser } from 'src/app/models/user';
import { AuthService } from 'src/app/public/auth-service/auth.service';

@Component({
  selector: 'app-quilometro',
  templateUrl: './quilometro.component.html',
  styleUrls: ['./quilometro.component.css']
})
export class QuilometroComponent implements OnInit {

  quilometros: QuilometroData = {
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
  queryField2 = new FormControl();
  

  constructor(
    private quilometroService: QuilometroService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.user = <JWTUser>this.authService.userValue;
   }

  ngOnInit() {
    this.refresh();
  }

  get isAdmin() {
    return this.user?.role === 'admin';
  }

  get isGerente() {
    return this.user?.role === 'gerente';
  }

  refresh() {
    this.quilometroService.getQuilometrosPaginated(1, 10)
      .pipe(
        map((quilometroData: QuilometroData) => this.quilometros = quilometroData),
        catchError(error => {
          this.onError('Error ao carregar quilometos')
          return of([])
        })
      ).subscribe();
  }

  onPagination(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    
    page = page +1;
    this.quilometroService.getQuilometrosPaginated(page, size).pipe(
      map((quilometros: QuilometroData) => this.quilometros = quilometros)
    ).subscribe();
  }

  onSearch() {
    let value = this.queryField.value ? this.queryField.value : '';
    let value2 = this.queryField2.value ? this.queryField2.value : '';

    this.quilometroService.getFilter(value, value2, 1, 10).subscribe(quilometros => this.quilometros = quilometros);
  }

  onReset() {
    this.queryField.reset();
    this.queryField2.reset();
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

  onEdit(quilometro: Quilometro) {
    this.router.navigate([quilometro.id], { relativeTo: this.route });
  }

  onRemove(quilometro: Quilometro) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover essa quilometragem?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.quilometroService.remove(quilometro.id).subscribe(
          () => {
            this.refresh()
            this.snackBar.open('Quilometragem removida com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            })
          },
          () => this.onError('Erro ao tentar remover quilometragem')
        )
      }
    })
  }

  onRedirect(quilometragem: Quilometro) {
    this.router.navigate([`detailed/${quilometragem.id}`], { relativeTo: this.route })
  }

}
