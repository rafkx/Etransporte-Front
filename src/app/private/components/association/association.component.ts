import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario-service/funcionario.service';
import { VeiculoService } from '../../services/veiculo-service/veiculo.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Veiculo } from 'src/app/models/veiculo';
import { Funcionario } from 'src/app/models/funcionario';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent implements OnInit {


  firstFormGroup = this.formBuilder.group({
    funcionario: new FormControl({}, Validators.required),
  });
  secondFormGroup = this.formBuilder.group({
    veiculo: new FormControl({}, [Validators.required])
  });
  veiculos: Veiculo[] = [];
  funcionarios: Funcionario[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private veiculoService: VeiculoService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: Router,
  ) { }

  ngOnInit() {
    this.funcionarioService.getFuncionarios().subscribe(funcionarios => this.funcionarios = funcionarios);
    this.veiculoService.getVeiculos().subscribe(veiculos => this.veiculos = veiculos);
  }

  associate() {
    this.veiculoService.autorizarVeiculo({
      funcionario: this.getFuncionario.value,
      veiculo: this.getVeiculo.value
      })
      .subscribe({ next: (_result => this.onSuccess()), error: (_error => this.onError(_error)) })
  }

  onCancel() {
    this.route.navigateByUrl('/private/associate/list');
  }

  private onSuccess() {
    this.snackBar.open('Associação feita com sucesso', '', { duration: 2000 });
    this.route.navigateByUrl('/private/associate/list');
  }

  private onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
    //this.snackBar.open('Erro ao associar veículo e funcionário', '', { duration: 5000 });
  }

  get getVeiculo(): FormControl {
    return this.secondFormGroup.get('veiculo') as FormControl;
  }

  get getFuncionario(): FormControl {
    return this.firstFormGroup.get('funcionario') as FormControl;
  }
}
