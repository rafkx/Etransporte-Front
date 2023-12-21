import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Manutencao, ManutencaoData } from 'src/app/models/manutencao';
import { ManutencaoService } from '../../services/manutencao-service/manutencao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.css']
})
export class ManutencaoComponent implements OnInit {

  manutencoes: ManutencaoData = {
    data: [],
    meta: {
      take: 0,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false
    }
  }
  pageEvent !: PageEvent;
  queryField = new FormControl();

  constructor(
    private manutencaoService: ManutencaoService,
    private router: Router,
    private route: ActivatedRoute, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.manutencaoService.getManutencoesPaginated(1, 10)
    .pipe(
      map((manutencaoData: ManutencaoData) => this.manutencoes = manutencaoData),
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
    this.manutencaoService.getManutencoesPaginated(page, size).pipe(
      map((manutencoes: ManutencaoData) => this.manutencoes = manutencoes)
    ).subscribe();
  }

  onReset() {
    this.queryField.reset();
    this.refresh();
  }

  onSearch() {
    let value = this.queryField.value ? this.queryField.value : '';
    console.log(value);
    this.manutencaoService.getFilter(value, 1, 10).subscribe(manutencoes => this.manutencoes = manutencoes);
  }

  onError (errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  goBack() {
    this.router.navigateByUrl('/private/dashboard')
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(manutencao: Manutencao) {
    this.router.navigate([manutencao.id], { relativeTo: this.route });
  }

  onRemove(manutencao: Manutencao) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover essa manutenção?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.manutencaoService.remove(manutencao.id).subscribe(
          () => {
            this.refresh()
            this.snackBar.open('Manutenção removida com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            })
          },
          () => this.onError('Erro ao tentar remover manutenção')
        )
      }
    })
  }

}
