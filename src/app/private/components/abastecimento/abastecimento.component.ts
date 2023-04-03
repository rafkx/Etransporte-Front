import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Abastecimento } from 'src/app/models/abastecimento';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { AbastecimentoService } from './abastecimento-service/abastecimento.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-abastecimento',
  templateUrl: './abastecimento.component.html',
  styleUrls: ['./abastecimento.component.css']
})
export class AbastecimentoComponent implements OnInit {

  abastecimento$: Observable<any> | undefined;
  queryField = new FormControl();
  quantLitro: number = 0;

  constructor(
    private abastecimentoService: AbastecimentoService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.abastecimento$ = this.abastecimentoService.getAbastecimentos();
  }

  refresh() {
    this.abastecimento$ = this.abastecimentoService.getAbastecimentos()
      .pipe(
        catchError(error => {
          this.onError('Error ao carregar abastecimentos')
          return of([])
        })
      );
  }

  onSearch() {
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== ''){
      this.abastecimento$ = this.abastecimentoService.getFilter(value);
    } else {
      this.refresh();
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

}
