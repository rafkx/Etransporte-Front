import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeiculoResolver } from './guards/veiculo.resolver';
import { VeiculoFormComponent } from './veiculo-form/veiculo-form.component';
import { VeiculoComponent } from './veiculo.component';

const routes: Routes = [
  { path: '', component: VeiculoComponent },
  { path: 'new', component: VeiculoFormComponent, resolve: { veiculo: VeiculoResolver } },
  { path: ':id', component: VeiculoFormComponent, resolve: { veiculo: VeiculoResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeiculoRoutingModule { }
