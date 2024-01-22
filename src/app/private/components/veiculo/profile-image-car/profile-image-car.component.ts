import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FileV, FileVeiculo } from 'src/app/models/file_veiculo';

@Component({
  selector: 'app-profile-image-car',
  templateUrl: './profile-image-car.component.html',
  styleUrls: ['./profile-image-car.component.css']
})
export class ProfileImageCarComponent {
  selectedImage: File | null = null;
  imagePath: any;

  constructor(
    public dialogRef: MatDialogRef<ProfileImageCarComponent>
  ) { }

  onFileChange(event: any): void {
    const selectedFiles = event.srcElement.files;
    this.selectedImage = selectedFiles[0];

    const reader = new FileReader();
    reader.readAsDataURL(selectedFiles[0]); 
    reader.onload = (_event) => { 
        this.imagePath = reader.result; 
    }
  }

  closeDialog(): void {
    this.dialogRef.close(this.selectedImage);
  }

}
