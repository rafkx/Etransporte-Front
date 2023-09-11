import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbastecimentoFormComponent } from './components/abastecimento/abastecimento-form/abastecimento-form.component';
import { AbastecimentoComponent } from './components/abastecimento/abastecimento.component';
import { AbastecimentoResolver } from './components/abastecimento/guards/abastecimento.resolver';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FuncionarioDetailedComponent } from './components/funcionario/funcionario-detailed/funcionario-detailed.component';
import { FuncionarioFormComponent } from './components/funcionario/funcionario-form/funcionario-form.component';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { FuncionarioResolver } from './components/funcionario/guards/funcionario.resolver';
import { PecaResolver } from './components/peca/guards/peca.resolver';
import { PecaFormComponent } from './components/peca/peca-form/peca-form.component';
import { PecaComponent } from './components/peca/peca.component';
import { QuilometroResolver } from './components/quilometro/guards/quilometro.resolver';
import { QuilometroFormComponent } from './components/quilometro/quilometro-form/quilometro-form.component';
import { QuilometroComponent } from './components/quilometro/quilometro.component';
import { RegisterComponent } from './components/register/register.component';
import { UserFormComponent } from './components/register/user-form/user-form.component';
import { ServicoResolver } from './components/servico/guards/servico.resolver';
import { ServicoFormComponent } from './components/servico/servico-form/servico-form.component';
import { ServicoComponent } from './components/servico/servico.component';
import { VeiculoResolver } from './components/veiculo/guards/veiculo.resolver';
import { VeiculoFormComponent } from './components/veiculo/veiculo-form/veiculo-form.component';
import { VeiculoComponent } from './components/veiculo/veiculo.component';
import { VeiculoDetailedComponent } from './components/veiculo/veiculo-detailed/veiculo-detailed.component';
import { PecaDetailedComponent } from './components/peca/peca-detailed/peca-detailed.component';
import { FornecedorComponent } from './components/fornecedor/fornecedor.component';
import { FornecedorFormComponent } from './components/fornecedor/fornecedor-form/fornecedor-form.component';
import { FornecedorResolver } from './components/fornecedor/guards/fornecedor.resolver';
import { FornecedorDetailedComponent } from './components/fornecedor/fornecedor-detailed/fornecedor-detailed.component';
import { ServicoDetailedComponent } from './components/servico/servico-detailed/servico-detailed.component';
import { QuilometroDetailedComponent } from './components/quilometro/quilometro-detailed/quilometro-detailed.component';
import { AbastecimentoDetailedComponent } from './components/abastecimento/abastecimento-detailed/abastecimento-detailed.component';
import { Role } from '../models/role';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'funcionario', component: FuncionarioComponent, data: { roles: [Role.Admin]} },
  { path: 'funcionario/new', component: FuncionarioFormComponent, resolve: { funcionario: FuncionarioResolver } },
  { path: 'funcionario/:id', component: FuncionarioFormComponent, resolve: { funcionario: FuncionarioResolver } },
  { path: 'funcionario/detailed/:id', component: FuncionarioDetailedComponent, resolve: { funcionario: FuncionarioResolver } },
  { path: 'fornecedor', component: FornecedorComponent },
  { path: 'fornecedor/new', component: FornecedorFormComponent, resolve: { fornecedor: FornecedorResolver } },
  { path: 'fornecedor/:id', component: FornecedorFormComponent, resolve: { fornecedor: FornecedorResolver } },
  { path: 'fornecedor/detailed/:id', component: FornecedorDetailedComponent, resolve: { fornecedor: FornecedorResolver } },
  { path: 'veiculo', component: VeiculoComponent },
  { path: 'veiculo/new', component: VeiculoFormComponent, resolve: { veiculo: VeiculoResolver } },
  { path: 'veiculo/:id', component: VeiculoFormComponent, resolve: { veiculo: VeiculoResolver } },
  { path: 'veiculo/detailed/:id', component: VeiculoDetailedComponent, resolve: { veiculo: VeiculoResolver } },
  { path: 'user', component: UserFormComponent },
  { path: 'user/list', component: RegisterComponent },
  { path: 'servico', component: ServicoComponent },
  { path: 'servico/new', component: ServicoFormComponent, resolve: { servico: ServicoResolver } },
  { path: 'servico/:id', component: ServicoFormComponent, resolve: { servico: ServicoResolver } },
  { path: 'servico/detailed/:id', component: ServicoDetailedComponent, resolve: { servico: ServicoResolver } },
  { path: 'peca', component: PecaComponent },
  { path: 'peca/new', component: PecaFormComponent, resolve: { peca: PecaResolver } },
  { path: 'peca/:id', component: PecaFormComponent, resolve: { peca: PecaResolver } },
  { path: 'peca/detailed/:id', component: PecaDetailedComponent, resolve: { peca: PecaResolver } },
  { path: 'quilometro', component: QuilometroComponent },
  { path: 'quilometro/new', component: QuilometroFormComponent, resolve: {quilometro: QuilometroResolver } },
  { path: 'quilometro/:id', component: QuilometroFormComponent, resolve: {quilometro: QuilometroResolver } },
  { path: 'quilometro/detailed/:id', component: QuilometroDetailedComponent, resolve: {quilometro: QuilometroResolver } },
  { path: 'abastecimento', component: AbastecimentoComponent, data: { roles: [Role.Admin]} },
  { path: 'abastecimento/new', component: AbastecimentoFormComponent, resolve: { abastecimento: AbastecimentoResolver }, data: { roles: [Role.Admin]} },
  { path: 'abastecimento/:id', component: AbastecimentoFormComponent, resolve: { abastecimento: AbastecimentoResolver }, data: { roles: [Role.Admin]} },
  { path: 'abastecimento/detailed/:id', component: AbastecimentoDetailedComponent, resolve: { abastecimento: AbastecimentoResolver }, data: { roles: [Role.Admin]} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
