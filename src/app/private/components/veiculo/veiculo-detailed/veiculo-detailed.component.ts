import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from '../../../services/veiculo-service/veiculo.service';
import { FileV } from 'src/app/models/file_veiculo';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-veiculo-detailed',
  templateUrl: './veiculo-detailed.component.html',
  styleUrls: ['./veiculo-detailed.component.css']
})
export class VeiculoDetailedComponent implements OnInit {

  veiculo!: Veiculo;
  files: FileV[] | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private veiculoService: VeiculoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.veiculo = this.route.snapshot.data['veiculo'];
    this.veiculoService.getFiles(this.veiculo?.id).subscribe(files => this.files = files);
  }

  goBack() {
    this.router.navigateByUrl('/private/veiculo')
  }

  onError (errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onDownload (file: FileV) {
    this.veiculoService.downloadFile(file.fileName).subscribe(response => {
      let fileName = file.fileName;
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }

  onDelete(file: FileV) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Tem certeza que deseja remover o arquivo ${file.fileName}?`,
    });
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.veiculoService.removeFile(file.fileName).subscribe(
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
