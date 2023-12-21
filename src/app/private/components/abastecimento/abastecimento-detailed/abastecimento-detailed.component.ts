import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Abastecimento } from 'src/app/models/abastecimento';
import { FileA } from 'src/app/models/file_abastecimento';
import { AbastecimentoService } from '../../../services/abastecimento-service/abastecimento.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-abastecimento-detailed',
  templateUrl: './abastecimento-detailed.component.html',
  styleUrls: ['./abastecimento-detailed.component.css']
})
export class AbastecimentoDetailedComponent implements OnInit {

  abastecimento!: Abastecimento;
  files: FileA[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private abastecimentoService: AbastecimentoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.abastecimento = this.route.snapshot.data['abastecimento'];
    this.abastecimentoService.getFiles(this.abastecimento?.id).subscribe(files => this.files = files);
  }

  onError (errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  goBack() {
    this.router.navigateByUrl('/private/abastecimento')
  }

  onDownload (file: FileA) {
    this.abastecimentoService.downloadFile(file.fileName).subscribe(response => {
      let fileName = file.fileName;
      let blob: Blob = response.body as Blob;
      let a =document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }

  onDelete(file: FileA) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Tem certeza que deseja remover o arquivo ${file.fileName}?`,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.abastecimentoService.removeFile(file.fileName).subscribe(
          () => {
            this.ngOnInit();
            this.snackBar.open('Arquivo removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            })
          }, 
          () => this.onError('Erro ao tentar remover o arquivo')
        )
      }
    })
  }

}
