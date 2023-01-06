import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'public' },
  /*{
    path: 'funcionario',
    loadChildren: () => import('./funcionario/funcionario.module').then(m => m.FuncionarioModule)
  },
  {
    path: 'veiculo',
    loadChildren: () => import('./veiculo/veiculo.module').then(m => m.VeiculoModule)
  },*/
  {
    path: 'private',
    canActivate: [AuthGuard],
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
  },
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
