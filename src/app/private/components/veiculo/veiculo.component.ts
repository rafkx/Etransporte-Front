import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Veiculo } from 'src/app/models/veiculo';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { VeiculoService } from './veiculo-service/veiculo.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit{
  
  veiculo$: Observable<any> | undefined;
  queryField = new FormControl();

  constructor(
    private veiculoService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { } 

  ngOnInit() {
    this.veiculo$ = this.veiculoService.getVeiculos();
  }

  refresh() {
    this.veiculo$ = this.veiculoService.getVeiculos()
    .pipe(
      catchError(error => {
        this.onError('Error ao carregar veículos')
        return of([])
      })
    );
  }

  onSearch() {
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== ''){
      this.veiculo$ = this.veiculoService.getFilter(value)
    } else {
      this.refresh()
    }
  }

  onError (errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(veiculo: Veiculo) {
    this.router.navigate([veiculo.id], { relativeTo: this.route });
  }

  onRemove(veiculo: Veiculo) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse veículo?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.veiculoService.remove(veiculo.id).subscribe(
          () => {
            this.refresh()
            this.snackBar.open('Veículo removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            })
          },
          () => this.onError('Erro ao tentar remover veículo')
        )
      }
    })
  }
}
