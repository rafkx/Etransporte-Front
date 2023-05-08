import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Peca } from 'src/app/models/peca';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { PecaService } from './peca-service/peca.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-peca',
  templateUrl: './peca.component.html',
  styleUrls: ['./peca.component.css']
})
export class PecaComponent implements OnInit {

  peca$: Observable<any> | undefined;
  queryField = new FormControl();

  constructor(
    private pecaService: PecaService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.peca$ = this.pecaService.getPecas();
  }

  refresh() {
    this.peca$ = this.pecaService.getPecas()
      .pipe(
        catchError(error => {
          this.onError('Error ao carregar peças')
          return of([])
        })
      );
  }

  onSearch() {
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== ''){
      this.peca$ = this.pecaService.getFilter(value)
    } else {
      this.refresh()
    }
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
