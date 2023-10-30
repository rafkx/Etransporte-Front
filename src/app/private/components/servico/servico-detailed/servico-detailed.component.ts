import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileS } from 'src/app/models/file_servico';
import { Servico } from 'src/app/models/servico';
import { ServicoServiceService } from '../../../services/servico-service/servico-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-servico-detailed',
  templateUrl: './servico-detailed.component.html',
  styleUrls: ['./servico-detailed.component.css']
})
export class ServicoDetailedComponent implements OnInit {

  servico!: Servico;
  files: FileS[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private servicoService: ServicoServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }
  
  ngOnInit() {
    this.servico = this.route.snapshot.data['servico'];
    this.servicoService.getFiles(this.servico?.id).subscribe(files => this.files = files);
  }

  onError (errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onDownload (file: FileS) {
    this.servicoService.downloadfile(file.fileName).subscribe(response => {
      let fileName = file.fileName;
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }

  onDelete(file: FileS) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Tem certeza que deseja remover o arquivo ${file.fileName}?`,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.servicoService.removeFile(file.fileName).subscribe(
          () => {
            this.ngOnInit();
            this.snackBar.open('Arquivo removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            })
          },
          () => this.onError('Error ao tentar remover arquivo')
        )
      }
    })
  }
  
}
