import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/public/auth-service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    user: User;
    
    constructor(
        private router: Router,
        private AuthService: AuthService,
    ) { 
      this.user = <User>this.AuthService.userValue;
    }

    public logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
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
}
