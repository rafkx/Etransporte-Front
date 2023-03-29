import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Abastecimento } from 'src/app/models/abastecimento';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from '../../veiculo/veiculo-service/veiculo.service';
import { AbastecimentoService } from '../abastecimento-service/abastecimento.service';

@Component({
  selector: 'app-abastecimento-form',
  templateUrl: './abastecimento-form.component.html',
  styleUrls: ['./abastecimento-form.component.css']
})
export class AbastecimentoFormComponent implements OnInit{

  form = this.formBuilder.group({
    id: [''],
    tipoComb: ['', [Validators.required]],
    quantLitros: [0, [Validators.required]],
    valorLitro: [0, [Validators.required]],
    desconto: [0, [Validators.required]],
    data: ['', [Validators.required]],
    veiculo: [{}, [Validators.required]],
    km: this.formBuilder.group({
      id: [''],
      quantKm: [0, [Validators.required]],
      data: [''],
      veiculo: [{}]
    })
  })

  veiculos: Veiculo[] | undefined;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private abastecimentoService: AbastecimentoService,
    private veiculoService: VeiculoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.veiculoService.getVeiculos().subscribe(veiculos => this.veiculos = veiculos);
    const abastecimento: Abastecimento = this.route.snapshot.data['abastecimento'];
    this.form.patchValue({
      id: abastecimento.id,
      tipoComb: abastecimento.tipoComb,
      quantLitros: abastecimento.quantLitros,
      valorLitro: abastecimento.valorLitro,
      desconto: abastecimento.desconto,
      data: abastecimento.data,
      veiculo: abastecimento.veiculo,
      km: {
        id: abastecimento.km.id,
        quantKm: abastecimento.km.quantKm,
        data: abastecimento.data,
        veiculo: abastecimento.veiculo,
      }
    })
  }

  onSubmit() {
    this.abastecimentoService.save({
      id: this.id.value,
      tipoComb: this.tipoComb.value,
      quantLitros: this.quantLitros.value,
      valorLitro: this.valorLitro.value,
      desconto: this.desconto.value,
      data: this.data.value,
      veiculo: this.veiculo.value,
      km: {
        id: this.idKm.value,
        quantKm: this.quantKm.value,
        data: this.data.value,
        veiculo: this.veiculo.value
      }
    }).subscribe({ next: (result => this.onSucces()), error: (error => this.onError()) });
  }

  onCancel() {
    this.location.back();
  }

  private onSucces() {
    this.snackBar.open('Abastecimento casdastrado com sucesso', '', { duration: 2000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao cadastrar abastecimento', '', { duration: 5000 });
  }

  get id(): FormControl{
    return this.form.get('id') as FormControl;
  }
  get tipoComb(): FormControl{
    return this.form.get('tipoComb') as FormControl;
  }
  get quantLitros(): FormControl{
    return this.form.get('quantLitros') as FormControl;
  }
  get valorLitro(): FormControl{
    return this.form.get('valorLitro') as FormControl;
  }
  get desconto(): FormControl{
    return this.form.get('desconto') as FormControl;
  }
  get data(): FormControl{
    return this.form.get('data') as FormControl;
  }
  get veiculo(): FormControl{
    return this.form.get('veiculo') as FormControl;
  }
  get idKm(): FormControl{
    return this.km.get('id') as FormControl;
  }
  get quantKm(): FormControl{
    return this.km.get('quantKm') as FormControl;
  }
  get dataKm(): FormControl{
    return this.km.get('data') as FormControl;
  }
  get km(): FormGroup{
    return this.form.get('km') as FormGroup;
  }
}
