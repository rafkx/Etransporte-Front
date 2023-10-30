import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario-service/funcionario.service';
import { VeiculoService } from '../../services/veiculo-service/veiculo.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Veiculo } from 'src/app/models/veiculo';
import { Funcionario } from 'src/app/models/funcionario';

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
    veiculos: new FormControl([], [Validators.required])
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
  }

  associate() {
    this.funcionarioService.associate(
      this.getFuncionario.value,
      {veiculos: this.getVeiculos.value})
      .subscribe({ next: (_result => this.onSuccess()), error: (_error => this.onError()) })
  }

  onNext() {
    this.veiculoService.getVeiculosAvailable(this.getFuncionario.value).subscribe(veiculos => this.veiculos = veiculos);
  }

  onCancel() {
    this.route.navigateByUrl('/private/dashboard');
  }

  private onSuccess() {
    this.snackBar.open('Associação feita com sucesso', '', { duration: 2000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao associar veículo e funcionário', '', { duration: 5000 });
  }

  get getVeiculos(): FormControl {
    return this.secondFormGroup.get('veiculos') as FormControl;
  }

  get getFuncionario(): FormControl {
    return this.firstFormGroup.get('funcionario') as FormControl;
  }
}
