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
import { UserEditComponent } from './components/register/user-edit/user-edit.component';
import { AssociationComponent } from './components/association/association.component';
import { ListComponent } from './components/association/list/list.component';
import { ManutencaoComponent } from './components/manutencao/manutencao.component';
import { ManutencaoFormComponent } from './components/manutencao/manutencao-form/manutencao-form.component';
import { ManutencaoResolver } from './components/manutencao/guards/manutencao.resolver';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, data: { roles: [Role.Admin, Role.User, Role.Gerente]} },
  { path: 'funcionario', component: FuncionarioComponent, data: { roles: [Role.Admin]} },
  { path: 'funcionario/new', component: FuncionarioFormComponent, resolve: { funcionario: FuncionarioResolver }, data: { roles: [Role.Admin]} },
  { path: 'funcionario/:id', component: FuncionarioFormComponent, resolve: { funcionario: FuncionarioResolver }, data: { roles: [Role.Admin]} },
  { path: 'funcionario/detailed/:id', component: FuncionarioDetailedComponent, resolve: { funcionario: FuncionarioResolver }, data: { roles: [Role.Admin]} },
  { path: 'fornecedor', component: FornecedorComponent, data: { roles: [Role.Admin, Role.User, Role.Gerente]} },
  { path: 'fornecedor/new', component: FornecedorFormComponent, resolve: { fornecedor: FornecedorResolver }, data: { roles: [Role.Admin, Role.Gerente]} },
  { path: 'fornecedor/:id', component: FornecedorFormComponent, resolve: { fornecedor: FornecedorResolver }, data: { roles: [Role.Admin, Role.Gerente]} },
  { path: 'fornecedor/detailed/:id', component: FornecedorDetailedComponent, resolve: { fornecedor: FornecedorResolver }, data: { roles: [Role.Admin, Role.Gerente]} },
  { path: 'veiculo', component: VeiculoComponent, data: { roles: [Role.Admin, Role.User, Role.Gerente]} },
  { path: 'veiculo/new', component: VeiculoFormComponent, resolve: { veiculo: VeiculoResolver }, data: { roles: [Role.Admin]} },
  { path: 'veiculo/:id', component: VeiculoFormComponent, resolve: { veiculo: VeiculoResolver }, data: { roles: [Role.Admin]} },
  { path: 'veiculo/detailed/:id', component: VeiculoDetailedComponent, resolve: { veiculo: VeiculoResolver }, data: { roles: [Role.Admin, Role.Gerente]} },
  { path: 'user', component: UserFormComponent, data: { roles: [Role.Admin]} },
  { path: 'user/list', component: RegisterComponent, data: { roles: [Role.Admin]} },
  { path: 'passwordChange', component: UserEditComponent, data: { roles: [Role.Admin, Role.Gerente, Role.User] }},
  { path: 'servico', component: ServicoComponent, data: { roles: [Role.Admin, Role.User, Role.Gerente]} },
  { path: 'servico/new', component: ServicoFormComponent, resolve: { servico: ServicoResolver }, data: { roles: [Role.Admin, Role.Gerente]} },
  { path: 'servico/:id', component: ServicoFormComponent, resolve: { servico: ServicoResolver }, data: { roles: [Role.Admin, Role.Gerente]} },
  { path: 'servico/detailed/:id', component: ServicoDetailedComponent, resolve: { servico: ServicoResolver }, data: { roles: [Role.Admin, Role.Gerente]} },
  { path: 'peca', component: PecaComponent, data: { roles: [Role.Admin, Role.User, Role.Gerente]} },
  { path: 'peca/new', component: PecaFormComponent, resolve: { peca: PecaResolver }, data: { roles: [Role.Admin, Role.Gerente]} },
  { path: 'peca/:id', component: PecaFormComponent, resolve: { peca: PecaResolver }, data: { roles: [Role.Admin, Role.Gerente]} },
  { path: 'peca/detailed/:id', component: PecaDetailedComponent, resolve: { peca: PecaResolver },data: { roles: [Role.Admin, Role.Gerente]} },
  { path: 'quilometro', component: QuilometroComponent, data: { roles: [Role.Admin, Role.User, Role.Gerente]} },
  { path: 'quilometro/new', component: QuilometroFormComponent, resolve: {quilometro: QuilometroResolver }, data: { roles: [Role.Admin, Role.User, Role.Gerente]} },
  { path: 'quilometro/:id', component: QuilometroFormComponent, resolve: {quilometro: QuilometroResolver }, data: { roles: [Role.Admin, Role.User, Role.Gerente]} },
  { path: 'quilometro/detailed/:id', component: QuilometroDetailedComponent, resolve: {quilometro: QuilometroResolver }, data: { roles: [Role.Admin, Role.User, Role.Gerente]} },
  { path: 'abastecimento', component: AbastecimentoComponent, data: { roles: [Role.Admin, Role.User, Role.Gerente]} },
  { path: 'abastecimento/new', component: AbastecimentoFormComponent, resolve: { abastecimento: AbastecimentoResolver }, data: { roles: [Role.Admin, Role.User, Role.Gerente]} },
  { path: 'abastecimento/:id', component: AbastecimentoFormComponent, resolve: { abastecimento: AbastecimentoResolver }, data: { roles: [Role.Admin, Role.User, Role.Gerente]} },
  { path: 'abastecimento/detailed/:id', component: AbastecimentoDetailedComponent, resolve: { abastecimento: AbastecimentoResolver }, data: { roles: [Role.Admin, Role.User, Role.Gerente]} },
  { path: 'associate/list', component: ListComponent, data: { roles: [Role.Admin, Role.Gerente] } },
  { path: 'associate', component: AssociationComponent, data: { roles: [Role.Admin, Role.Gerente] } },
  { path: 'manutencao', component: ManutencaoComponent, data: { roles: [Role.Admin, Role.Gerente] } },
  { path: 'manutencao/new', component: ManutencaoFormComponent, resolve: { manutencao: ManutencaoResolver }, data: { roles: [Role.Admin, Role.Gerente] } },
  { path: 'manutencao/:id', component: ManutencaoFormComponent, resolve: { manutencao: ManutencaoResolver }, data: { roles: [Role.Admin, Role.Gerente] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
