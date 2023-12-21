import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from '../../../services/funcionario-service/funcionario.service';
import { FileF } from 'src/app/models/file_funcionario';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-funcionario-detailed',
  templateUrl: './funcionario-detailed.component.html',
  styleUrls: ['./funcionario-detailed.component.css']
})
export class FuncionarioDetailedComponent implements OnInit {

  funcionario!: Funcionario;
  files: FileF[] | undefined;

  constructor( 
    private serviceFuncionario: FuncionarioService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
     this.funcionario = this.route.snapshot.data['funcionario'];
     this.serviceFuncionario.getFiles(this.funcionario.id).subscribe(files => this.files = files);
  }

  goBack() {
    this.router.navigateByUrl('/private/funcionario')
  }

  onError (errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onDownload (file: FileF) {
    this.serviceFuncionario.downloadFile(file.fileName).subscribe(response => {
      let fileName = file.fileName;
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }

  onDelete(file: FileF) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Tem certeza que deseja remover o arquivo ${file.fileName}?`,
    }); 

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.serviceFuncionario.removeFile(file.fileName).subscribe(
          () => {
            this.ngOnInit();
            this.snackBar.open('Arquivo removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            })
          },
          () => this.onError('Erro ao tentar remover arquivo')
        )
      }
    })
  }



}
