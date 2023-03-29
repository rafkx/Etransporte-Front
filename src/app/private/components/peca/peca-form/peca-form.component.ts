import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Peca } from 'src/app/models/peca';
import { Veiculo } from 'src/app/models/veiculo';
import { FornecedorService } from '../../fornecedor/fornecedor-service/fornecedor.service';
import { VeiculoService } from '../../veiculo/veiculo-service/veiculo.service';
import { PecaService } from '../peca-service/peca.service';

@Component({
  selector: 'app-peca-form',
  templateUrl: './peca-form.component.html',
  styleUrls: ['./peca-form.component.css']
})
export class PecaFormComponent implements OnInit {
  
  form = this.formBuilder.group({
    id: [''],
    nomePeca: ['', [Validators.required]],
    codPeca: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    marcaFabricante: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    pequenaPeca: [[{
      id: ''
    }]],
    fornecedorP: [{}],
    veiculo: [[{
      id: ''
    }]]
  })

  pecas: Peca[] | undefined;
  fornecedores: Fornecedor[] | undefined;
  veiculos: Veiculo[] | undefined;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private servicePeca: PecaService,
    private serviceFornecedor: FornecedorService,
    private serviceVeiculo: VeiculoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) { }
  
  ngOnInit() {
    this.servicePeca.getPecas().subscribe(pecas => this.pecas = pecas);
    this.serviceFornecedor.getFornecedores().subscribe(fornecedores => this.fornecedores = fornecedores);
    this.serviceVeiculo.getVeiculos().subscribe(veiculos => this.veiculos = veiculos);
    const peca: Peca = this.route.snapshot.data['peca'];
    this.form.patchValue({
      id: peca.id,
      nomePeca: peca.nomePeca,
      codPeca: peca.codPeca,
      descricao: peca.descricao,
      marcaFabricante: peca.marcaFabricante,
      modelo: peca.modelo,
      pequenaPeca: peca.pequenaPeca,
      fornecedorP: peca.fornecedorP,
      veiculo: peca.veiculo
      })
  }

  onSubmit() {
    this.servicePeca.save({
      id: this.id.value,
      nomePeca: this.nomePeca.value,
      codPeca: this.codPeca.value,
      descricao: this.descricao.value,
      marcaFabricante: this.marcaFabricante.value,
      modelo: this.modelo.value,
      pequenaPeca: [this.pequenaPeca.value],
      fornecedorP: this.fornecedorP.value,
      veiculo: [this.veiculo.value]
    })
    .subscribe({ next: (result => this.onSuccess()), error: (error => this.onError()) });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Peça cadastrada com sucesso', '', { duration: 2000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro as cadastrar peça', '', { duration: 5000 });
  }

  get id(): FormControl{
    return this.form.get('id') as FormControl;
  }
  
  get nomePeca(): FormControl{
    return this.form.get('nomePeca') as FormControl;
  }
  
  get codPeca(): FormControl{
    return this.form.get('codPeca') as FormControl;
  }
  
  get descricao(): FormControl{
    return this.form.get('descricao') as FormControl;
  }
  
  get marcaFabricante(): FormControl{
    return this.form.get('marcaFabricante') as FormControl;
  }
  
  get modelo(): FormControl{
    return this.form.get('modelo') as FormControl;
  }
  
  get pequenaPeca(): FormControl{
    return this.form.get('pequenaPeca') as FormControl;
  }
  
  get fornecedorP(): FormControl{
    return this.form.get('fornecedorP') as FormControl;
  }

  get veiculo(): FormControl{
    return this.form.get('veiculo') as FormControl;
  }
}
