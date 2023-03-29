import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { UsersListComponent } from './components/register/users-list/users-list.component';
import { UserFormComponent } from './components/register/user-form/user-form.component';
import { FuncionarioDetailedComponent } from './components/funcionario/funcionario-detailed/funcionario-detailed.component';
import { FuncionarioFormComponent } from './components/funcionario/funcionario-form/funcionario-form.component';
import { FuncionarioListComponent } from './components/funcionario/funcionario-list/funcionario-list.component';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { ServicoFormComponent } from './components/servico/servico-form/servico-form.component';
import { ServicoListComponent } from './components/servico/servico-list/servico-list.component';
import { ServicoComponent } from './components/servico/servico.component';
import { VeiculoFormComponent } from './components/veiculo/veiculo-form/veiculo-form.component';
import { VeiculoListComponent } from './components/veiculo/veiculo-list/veiculo-list.component';
import { VeiculoComponent } from './components/veiculo/veiculo.component';
import { PecaComponent } from './components/peca/peca.component';
import { PecaFormComponent } from './components/peca/peca-form/peca-form.component';
import { PecaListComponent } from './components/peca/peca-list/peca-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuilometroComponent } from './components/quilometro/quilometro.component';
import { QuilometroFormComponent } from './components/quilometro/quilometro-form/quilometro-form.component';
import { QuilometroListComponent } from './components/quilometro/quilometro-list/quilometro-list.component';
import { AbastecimentoComponent } from './components/abastecimento/abastecimento.component';
import { AbastecimentoFormComponent } from './components/abastecimento/abastecimento-form/abastecimento-form.component';
import { AbastecimentoListComponent } from './components/abastecimento/abastecimento-list/abastecimento-list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FuncionarioComponent,
    FuncionarioFormComponent,
    FuncionarioListComponent,
    FuncionarioDetailedComponent,
    RegisterComponent,
    UsersListComponent,
    UserFormComponent,
    VeiculoComponent,
    VeiculoFormComponent,
    VeiculoListComponent,
    ServicoFormComponent,
    ServicoListComponent,
    ServicoComponent,
    PecaComponent,
    PecaFormComponent,
    PecaListComponent,
    QuilometroComponent,
    QuilometroFormComponent,
    QuilometroListComponent,
    AbastecimentoComponent,
    AbastecimentoFormComponent,
    AbastecimentoListComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class PrivateModule { }
