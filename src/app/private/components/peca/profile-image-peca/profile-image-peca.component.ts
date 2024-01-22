import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-image-peca',
  templateUrl: './profile-image-peca.component.html',
  styleUrls: ['./profile-image-peca.component.css']
})
export class ProfileImagePecaComponent {
  selectedImage: File | null = null;
  imagePath: any;

  constructor(
    public dialogRef: MatDialogRef<ProfileImagePecaComponent>
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
