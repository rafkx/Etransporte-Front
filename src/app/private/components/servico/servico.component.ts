import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Servico, ServicoData } from 'src/app/models/servico';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ServicoServiceService } from '../../services/servico-service/servico-service.service';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { JWTUser } from 'src/app/models/user';
import { AuthService } from 'src/app/public/auth-service/auth.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {
  
  servicos: ServicoData = {
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

  constructor(
    private servicoService: ServicoServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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

  goBack() {
    this.router.navigateByUrl('/private/dashboard')
  }

  refresh() {
    this.servicoService.getServicosPaginated(1, 10)
    .pipe(
      map((servicoData: ServicoData) => this.servicos = servicoData),
      catchError(error => {
        this.onError('Error ao carregar serviços')
        return of([])
      })
    ).subscribe();
  }

  onPagination(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    
    page = page +1;
    this.servicoService.getServicosPaginated(page, size).pipe(
      map((servicos: ServicoData) => this.servicos = servicos)
    ).subscribe();
  }

  onReset() {
    this.queryField.reset();
    this.refresh();
  }

  onSearch() {
    let value = this.queryField.value ? this.queryField.value : '';
    this.servicoService.getFilter(value, 1, 10).subscribe(servicos => this.servicos = servicos);
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

  onRedirect (servico: Servico) {
    this.router.navigate([`detailed/${servico.id}`], { relativeTo: this.route })
  }
}
