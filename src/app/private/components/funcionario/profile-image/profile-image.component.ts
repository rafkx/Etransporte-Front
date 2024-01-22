import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/private/services/funcionario-service/funcionario.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit{
  profileImage: File | null = null;
  imagePath: any;

  constructor(
    private service: FuncionarioService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onFileChange(event: any): void {
    const selectedFiles = event.srcElement.files;
    this.profileImage = selectedFiles[0];

    const reader = new FileReader();
    reader.readAsDataURL(selectedFiles[0]); 
    reader.onload = (_event) => { 
        this.imagePath = reader.result; 
    }
  }

  save() {
    if (this.profileImage) {
      this.service.addPhoto(this.profileImage)
      .subscribe(response => this.onSuccess())
    }
  }

  private onSuccess() {
    this.snackBar.open('Arquivo adicionado com sucesso!', '', { duration: 2000 });
    this.goBack();
  }

  goBack() {
    this.router.navigateByUrl('/private/dashboard')
  }

}
