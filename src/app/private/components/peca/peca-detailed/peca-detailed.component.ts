import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Peca } from 'src/app/models/peca';
import { PecaService } from '../peca-service/peca.service';
import { FileP } from 'src/app/models/file_peca';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-peca-detailed',
  templateUrl: './peca-detailed.component.html',
  styleUrls: ['./peca-detailed.component.css']
})
export class PecaDetailedComponent implements OnInit {

  peca!: Peca;
  files: FileP[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private pecaService: PecaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }
  
  ngOnInit() {
    this.peca = this.route.snapshot.data['peca'];
    this.pecaService.getFiles(this.peca.id).subscribe(files => this.files = files);
  }

  onError (errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onDownload (file: FileP) {
    this.pecaService.downloadFile(file.fileName).subscribe(response => {
      let fileName = file.fileName;
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }

  onDelete(file: FileP) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Tem certeza que deseja remover o arquivo ${file.fileName}?`,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.pecaService.removeFile(file.fileName).subscribe(
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
