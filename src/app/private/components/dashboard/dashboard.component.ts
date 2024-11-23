import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { JWTUser, User } from 'src/app/models/user';
import { AuthService } from 'src/app/public/auth-service/auth.service';
import { FuncionarioService } from '../../services/funcionario-service/funcionario.service';
import { Funcionario } from 'src/app/models/funcionario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: JWTUser;
  funcionario!: Funcionario;
  IsDisabled: boolean = true;
  isImageLoading: boolean | undefined;

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private funcionarioService: FuncionarioService
  ) {
    this.user = <JWTUser>this.AuthService.userValue;
    console.log(this.user);
  }
  ngOnInit() {
    this.funcionarioService.loadById(this.user.funcionario).subscribe(
      (data: any) => {
        this.funcionario = data;
        this.getImageFromService();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  get isAdmin() {
    return this.user?.role === 'admin';
  }

  get isUser() {
    return this.user?.role === 'user';
  }

  get isGerente() {
    return this.user.role === 'gerente';
  }

  getImageFromService() {
    this.isImageLoading = true;
    console.log(this.funcionario);
    if (!this.funcionario.fotoPerfil) {
      this.goToPhoto();
    } else {
      this.funcionarioService.getPhoto().subscribe(
        (data) => {
          console.log(data);
          this.createImageFromBlob(data);
          this.isImageLoading = false;
        },
        (error) => {
          this.isImageLoading = false;
        }
      );
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.funcionario.fotoPerfil = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  public logOut() {
    this.AuthService.logout();
  }

  public goToFuncionario() {
    this.router.navigateByUrl('/private/funcionario');
  }

  public goToVeiculo() {
    this.router.navigateByUrl('/private/veiculo');
  }

  public goToAutentication() {
    this.router.navigateByUrl('/private/user');
  }

  public goToServico() {
    this.router.navigateByUrl('/private/servico');
  }

  public goToPeca() {
    this.router.navigateByUrl('/private/peca');
  }

  public goToQuilometro() {
    this.router.navigateByUrl('/private/quilometro');
  }

  public goToAbastecimento() {
    this.router.navigateByUrl('/private/abastecimento');
  }

  public goToFornecedor() {
    this.router.navigateByUrl('/private/fornecedor');
  }

  public goToEditPassword() {
    this.router.navigateByUrl('/private/passwordChange');
  }

  public goToAssociation() {
    this.router.navigateByUrl('/private/associate/list');
  }

  public goToManutencao() {
    this.router.navigateByUrl('/private/manutencao');
  }

  public goToPhoto() {
    this.router.navigateByUrl('/private/photo');
  }
}
