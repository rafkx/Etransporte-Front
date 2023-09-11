import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Veiculo, VeiculoData } from 'src/app/models/veiculo';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { VeiculoService } from './veiculo-service/veiculo.service';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit{
  
  veiculos: VeiculoData = {
    data: [],
    meta: {
      take: 0,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false
    }
  };
  pageEvent!: PageEvent;
  queryField = new FormControl();
  queryField2 = new FormControl();

  constructor(
    private veiculoService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { } 

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.veiculoService.getVeiculosPaginated(1, 10)
    .pipe(
      map((veiculoData: VeiculoData) => this.veiculos = veiculoData),
      catchError(error => {
        this.onError('Error ao carregar veículos')
        return of([])
      })
    ).subscribe();
  }

  onPagination(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    
    page = page +1;
    this.veiculoService.getVeiculosPaginated(page, size).pipe(
      map((veiculos: VeiculoData) => this.veiculos = veiculos)
    ).subscribe();
  }

  onReset() {
    this.queryField.reset();
    this.queryField2.reset();
    this.refresh();
  }

  onSearch() {
    let value = this.queryField.value ? this.queryField.value : '';
    let value2 = this.queryField2.value ? this.queryField2.value : '';
    this.veiculoService.getFilter(value2, value, 1, 10).subscribe(veiculos => this.veiculos = veiculos);
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

  onRedirect (veiculo: Veiculo) {
    this.router.navigate([`detailed/${veiculo.id}`], { relativeTo: this.route })
  }
}
