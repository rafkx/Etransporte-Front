import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    constructor(
        private router: Router,
    ) { }

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
