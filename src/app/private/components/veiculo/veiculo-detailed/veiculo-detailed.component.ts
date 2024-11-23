import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from '../../../services/veiculo-service/veiculo.service';
import { FileV, FileVeiculo } from 'src/app/models/file_veiculo';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ProfileImageCarComponent } from '../profile-image-car/profile-image-car.component';

@Component({
  selector: 'app-veiculo-detailed',
  templateUrl: './veiculo-detailed.component.html',
  styleUrls: ['./veiculo-detailed.component.css'],
})
export class VeiculoDetailedComponent implements OnInit {
  veiculo!: Veiculo;
  files: FileV[] | undefined;
  isImageLoading: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private veiculoService: VeiculoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.veiculo = this.route.snapshot.data['veiculo'];
    this.veiculoService
      .getFiles(this.veiculo?.id)
      .subscribe((files) => (this.files = files));
    this.getImageFromService();
  }

  getImageFromService() {
    this.isImageLoading = true;
    if (!this.veiculo.fotoCarro) {
      this.openDialog();
    } else {
      this.veiculoService.getPhoto(this.veiculo.id).subscribe(
        (data) => {
          console.log(data);
          this.createImageFromBlob(data);
          this.isImageLoading = false;
        },
        (error) => {
          this.isImageLoading = false;
          console.log(error);
        }
      );
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.veiculo.fotoCarro = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProfileImageCarComponent);

    dialogRef.afterClosed().subscribe((selectedImage) => {
      if (selectedImage) {
        this.veiculoService
          .addPhoto(this.veiculo.id, selectedImage)
          .subscribe(() => console.log('Sucesso!'));
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('/private/veiculo');
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onDownload(file: FileV) {
    this.veiculoService.downloadFile(file.fileName).subscribe((response) => {
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
            });
          },
          () => this.onError('Erro ao tentar remover arquivo')
        );
      }
    });
  }
}
