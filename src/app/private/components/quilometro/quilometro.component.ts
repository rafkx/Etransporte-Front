import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Quilometro } from 'src/app/models/quilometro';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { QuilometroService } from './quilometro-service/quilometro.service';

@Component({
  selector: 'app-quilometro',
  templateUrl: './quilometro.component.html',
  styleUrls: ['./quilometro.component.css']
})
export class QuilometroComponent implements OnInit {

  quilometro$: Observable<any> | undefined;

  constructor(
    private quilometroService: QuilometroService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.quilometro$ = this.quilometroService.getQuilometros();
  }

  refresh() {
    this.quilometro$ = this.quilometroService.getQuilometros()
      .pipe(
        catchError(error => {
          this.onError('Error ao carregar quilometos')
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

}
