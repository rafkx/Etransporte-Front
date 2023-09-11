import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileQ } from 'src/app/models/file_quilometro';
import { Quilometro } from 'src/app/models/quilometro';
import { QuilometroService } from '../quilometro-service/quilometro.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-quilometro-detailed',
  templateUrl: './quilometro-detailed.component.html',
  styleUrls: ['./quilometro-detailed.component.css']
})
export class QuilometroDetailedComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private kmService: QuilometroService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  quilometro!: Quilometro;
  files: FileQ[] | undefined;

  ngOnInit() {
    this.quilometro = this.route.snapshot.data['quilometro'];
    this.kmService.getFiles(this.quilometro.id).subscribe(files => this.files = files);
  }

  onError (errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onDownload (file: FileQ) {
    this.kmService.downloadFile(file.fileName).subscribe(response => {
      let fileName = file.fileName;
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }

  onDelete(file: FileQ) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Tem certeza que deseja remover o arquivo ${file.fileName}?`,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.kmService.removeFile(file.fileName).subscribe(
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
