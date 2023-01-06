import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Veiculo } from './model/veiculo';
import { VeiculoService } from './veiculo.service';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit{
  
  veiculo$: Observable<any> | undefined;

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
