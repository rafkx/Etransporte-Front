import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioDetailedComponent } from './funcionario-detailed/funcionario-detailed.component';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { FuncionarioComponent } from './funcionario.component';
import { FuncionarioResolver } from './guards/funcionario.resolver';

const routes: Routes = [
  { path: '', component: FuncionarioComponent },
  { path: 'new', component: FuncionarioFormComponent, resolve: { funcionario: FuncionarioResolver } },
  { path: ':id', component: FuncionarioFormComponent, resolve: { funcionario: FuncionarioResolver } },
  { path: 'detailed/:id', component: FuncionarioDetailedComponent, resolve: { funcionario: FuncionarioResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
