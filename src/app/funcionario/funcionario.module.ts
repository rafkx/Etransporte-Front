import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from '../funcionario/funcionario.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncionarioListComponent } from './funcionario-list/funcionario-list.component';


@NgModule({
  declarations: [
    FuncionarioComponent,
    FuncionarioFormComponent,
    FuncionarioListComponent
  ],
  exports: [
    FuncionarioComponent,
    FuncionarioFormComponent,
    FuncionarioListComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ]
})
export class FuncionarioModule { }
