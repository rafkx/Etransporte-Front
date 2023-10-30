import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { JWTUser, User } from 'src/app/models/user';
import { AuthService } from 'src/app/public/auth-service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    user: JWTUser;
    IsDisabled: boolean = true;
    
    constructor(
        private router: Router,
        private AuthService: AuthService,
    ) { 
      this.user = <JWTUser>this.AuthService.userValue;
      console.log(this.user);
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

    public logOut() {
      this.AuthService.logout();
    }

    public goToFuncionario() {
    this.router.navigateByUrl('/private/funcionario')
    }

    public goToVeiculo() {
    this.router.navigateByUrl('/private/veiculo')
    }

    public goToAutentication() {
    this.router.navigateByUrl('/private/user')
    }

    public goToServico() {
    this.router.navigateByUrl('/private/servico')
    }

    public goToPeca() {
    this.router.navigateByUrl('/private/peca')
    }

    public goToQuilometro() {
      this.router.navigateByUrl('/private/quilometro')
    }

    public goToAbastecimento() {
      this.router.navigateByUrl('/private/abastecimento')
    }

    public goToFornecedor() {
      this.router.navigateByUrl('/private/fornecedor')
    }

    public goToEditPassword() {
      this.router.navigateByUrl('/private/passwordChange')
    }

    public goToAssociation() {
      this.router.navigateByUrl('/private/associate');
    }
}
