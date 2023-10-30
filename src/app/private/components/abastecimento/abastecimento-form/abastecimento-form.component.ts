import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Abastecimento } from 'src/app/models/abastecimento';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from '../../../services/veiculo-service/veiculo.service';
import { AbastecimentoService } from '../../../services/abastecimento-service/abastecimento.service';
import { CombustivelService } from '../../../services/combustivel-service/combustivel.service';
import { Combustivel } from 'src/app/models/combustivel';
import { FileAbastecimento } from 'src/app/models/file_abastecimento';

@Component({
  selector: 'app-abastecimento-form',
  templateUrl: './abastecimento-form.component.html',
  styleUrls: ['./abastecimento-form.component.css']
})
export class AbastecimentoFormComponent implements OnInit{

  form = this.formBuilder.group({
    id: [''],
    combustivel: [{}, [Validators.required]],
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
  combustiveis: Combustivel[] | undefined;
  IsDisabled: boolean = true;
  IsFormDisabled: boolean = false;
  file: FileAbastecimento | undefined | null;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private abastecimentoService: AbastecimentoService,
    private veiculoService: VeiculoService,
    private combustivelService: CombustivelService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.veiculoService.getVeiculos().subscribe(veiculos => this.veiculos = veiculos);
    this.combustivelService.getCombustiveis().subscribe(combustiveis =>  this.combustiveis = combustiveis);
    const abastecimento: Abastecimento = this.route.snapshot.data['abastecimento'];
    this.form.patchValue({
      id: abastecimento.id,
      combustivel: abastecimento.combustivel,
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
      combustivel: this.combustivel.value,
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

  onFileSelected(event: any) {
    const selectedFiles = event.srcElement.files;

    for (let x=0; x < selectedFiles.length; x++) {
      this.file = selectedFiles[0];
    }
  }

  onDeleteFile() {
    this.file = null;
  }

  onSaveFile() {
    if (this.file) {
      this.abastecimentoService.fileUpload(this.file, 'http://localhost:3000/files-abastecimento')
      .subscribe(response => this.snackBar.open('Arquivo adicionado com sucesso!', '', { duration: 2000 }));
      this.onCancel();
    } else {
      this.snackBar.open('Sem nenhum arquivo! Selecione um arquivo diferente!', 'X', { duration: 5000 });
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSucces() {
    this.snackBar.open('Abastecimento casdastrado com sucesso', '', { duration: 2000 });
    this.IsDisabled = false;
    this.IsFormDisabled = true;
    this.form.disable();
  }

  private onError() {
    this.snackBar.open('Erro ao cadastrar abastecimento', '', { duration: 5000 });
  }

  get id(): FormControl{
    return this.form.get('id') as FormControl;
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
  get combustivel(): FormControl{
    return this.form.get('combustivel') as FormControl;
  }
}
