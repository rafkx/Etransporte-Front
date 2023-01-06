import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'funcionario',
    loadChildren: () => import('./components/funcionario/funcionario.module').then(m => m.FuncionarioModule)
  },
  {
    path: 'veiculo',
    loadChildren: () => import('./components/veiculo/veiculo.module').then(m => m.VeiculoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
