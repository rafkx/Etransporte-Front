import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Servico } from 'src/app/models/servico';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ServicoServiceService } from './servico-service/servico-service.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {
  
  servico$: Observable<any> | undefined;
 
  constructor(
    private servicoService: ServicoServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }
  
  ngOnInit() {
    this.servico$ = this.servicoService.getServicos();
  }

  refresh() {
    this.servico$ = this.servicoService.getServicos()
    .pipe(
      catchError(error => {
        this.onError('Error ao carregar serviços')
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

  onEdit(servico: Servico) {
    this.router.navigate([servico.id], { relativeTo: this.route });
  }

  onRemove(servico: Servico) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse serviço?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.servicoService.remove(servico.id).subscribe(
          () => {
            this.refresh()
            this.snackBar.open('Serviço removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            })
          },
          () => this.onError('Error ao tentar remover serviço')
        )
      }
    })
  }

}
