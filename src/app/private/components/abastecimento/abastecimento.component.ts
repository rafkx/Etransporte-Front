import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Abastecimento, AbastecimentoData } from 'src/app/models/abastecimento';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { AbastecimentoService } from '../../services/abastecimento-service/abastecimento.service';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/public/auth-service/auth.service';
import { JWTUser } from 'src/app/models/user';

@Component({
  selector: 'app-abastecimento',
  templateUrl: './abastecimento.component.html',
  styleUrls: ['./abastecimento.component.css']
})
export class AbastecimentoComponent implements OnInit {

  abastecimentos: AbastecimentoData = {
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
    private abastecimentoService: AbastecimentoService,
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

  refresh() {
    this.abastecimentoService.getAbastecimentoPaginated(1, 10)
      .pipe(
        map((abastecimentoData: AbastecimentoData) => this.abastecimentos = abastecimentoData),
        catchError(error => {
          this.onError('Error ao carregar abastecimentos')
          return of([])
        })
      ).subscribe();
  }

  onPagination(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page +1;
    this.abastecimentoService.getAbastecimentoPaginated(page, size).pipe(
      map((abastecimentos: AbastecimentoData) => this.abastecimentos = abastecimentos)
    ).subscribe();
  }

  onSearch() {
    let value = this.queryField.value ? this.queryField.value : '';
    let value2 = this.queryField2.value ? this.queryField2.value : '';
    this.abastecimentoService.getFilter(value, value2, 1, 10).subscribe(abastecimentos => this.abastecimentos = abastecimentos);
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

  get isAdmin() {
    return this.user?.role === 'admin';
  }

  get isGerente() {
    return this.user?.role === 'gerente';
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(abastecimento: Abastecimento) {
    this.router.navigate([abastecimento.id], { relativeTo: this.route });
  }

  onRemove(abastecimento: Abastecimento) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse abastecimento?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.abastecimentoService.remove(abastecimento.id).subscribe(
          () => {
            this.refresh()
            this.snackBar.open('Abastecimento removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top', 
              horizontalPosition: 'center',
            })
          },
          () => this.onError('Erro ao tentar remover abastecimento')
        )
      }
    })
  }

  onRedirect(abastecimento: Abastecimento) {
    this.router.navigate([`detailed/${abastecimento.id}`], { relativeTo: this.route });
  }

}
