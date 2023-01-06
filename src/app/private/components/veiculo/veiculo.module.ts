import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeiculoRoutingModule } from './veiculo-routing.module';
import { VeiculoComponent } from './veiculo.component';
import { VeiculoFormComponent } from './veiculo-form/veiculo-form.component';
import { VeiculoListComponent } from './veiculo-list/veiculo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    VeiculoComponent,
    VeiculoFormComponent,
    VeiculoListComponent
  ],
  exports: [
    VeiculoComponent,
    VeiculoFormComponent,
    VeiculoListComponent
  ],
  imports: [
    CommonModule,
    VeiculoRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class VeiculoModule { }
