import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Peca, PecaData } from 'src/app/models/peca';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { PecaService } from '../../services/peca-service/peca.service';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/public/auth-service/auth.service';
import { JWTUser } from 'src/app/models/user';

@Component({
  selector: 'app-peca',
  templateUrl: './peca.component.html',
  styleUrls: ['./peca.component.css']
})
export class PecaComponent implements OnInit {

  pecas: PecaData = {
    data: [],
    meta: {
      take: 0,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false
    }
  };
  user: JWTUser
  pageEvent!: PageEvent;
  queryField = new FormControl();

  constructor(
    private pecaService: PecaService,
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
    this.pecaService.getPecasPaginated(1, 10)
      .pipe(
        map((pecasData: PecaData) => this.pecas = pecasData),
        catchError(error => {
          this.onError('Error ao carregar peças')
          return of([])
        })
      ).subscribe();
  }

  onPagination(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    
    page = page +1;
    this.pecaService.getPecasPaginated(page, size).pipe(
      map((pecas: PecaData) => this.pecas = pecas)
    ).subscribe();
  }

  onSearch() {
    let value = this.queryField.value ? this.queryField.value : '';
    this.pecaService.getFilter(value, 1, 10).subscribe(pecas => this.pecas = pecas);
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

  onEdit(peca: Peca) {
    this.router.navigate([peca.id], { relativeTo: this.route });
  }

  onRemove(peca: Peca) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover essa peça?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.pecaService.remove(peca.id).subscribe(
          () => {
            this.refresh()
            this.snackBar.open('Peça removida com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            })
          },
          () => this.onError('Erro ao tentar remover peça')
        )
      }
    })
  }

  onRedirect(peca: Peca) {
    this.router.navigate([`detailed/${peca.id}`], { relativeTo: this.route })
  }
}
