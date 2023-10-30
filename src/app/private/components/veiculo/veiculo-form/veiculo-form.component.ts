import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from '../../../services/veiculo-service/veiculo.service';
import { FileVeiculo } from 'src/app/models/file_veiculo';
import { CombustivelService } from 'src/app/private/services/combustivel-service/combustivel.service';
import { Combustivel } from 'src/app/models/combustivel';

@Component({
  selector: 'app-veiculo-form',
  templateUrl: './veiculo-form.component.html',
  styleUrls: ['./veiculo-form.component.css']
})
export class VeiculoFormComponent implements OnInit{
  
  form = this.formBuilder.group({
    id: [''],
    placa: ['', [Validators.required]],
    renavam: ['', [Validators.required]],
    chassi: ['', [Validators.required]],
    tipoChassi: ['', [Validators.required]],
    ano: [0, [Validators.required]],
    modelo: ['', [Validators.required]],
    marca: ['', [Validators.required]],
    combustivel: [{
      id: '',
      nome: ''
    }, [Validators.required]],
    ultimaKm: [0, [Validators.required]],
    corInterna: [''],
    corExterna: [''],
    numMotorInterno: [0],
    numMotorExterno: [0],
    rastreador: [false],
    bloqueador: [false],
    dataAquisicao: ['', [Validators.required]],
    condicao: ['', [Validators.required]],
    valorCompra: [0, [Validators.required]],
    ValorReforma: [0],
    valorMercado: [0, [Validators.required]],
    nomeVendedor: ['', [Validators.required]],
    teleVendedor: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
  });

  combustiveis: Combustivel[] | undefined;
  files: FileVeiculo[] = [];
  IsDisabled: boolean = true;
  IsFormDisabled: boolean = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private serviceVeiculo: VeiculoService,
    private combustivelService: CombustivelService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.combustivelService.getCombustiveis().subscribe(combustiveis =>  this.combustiveis = combustiveis);
    const veiculo: Veiculo = this.route.snapshot.data['veiculo'];
    this.form.patchValue({
      id: veiculo.id,
      placa: veiculo.placa,
      renavam: veiculo.renavam,
      chassi: veiculo.chassi,
      tipoChassi: veiculo.tipoChassi,
      ano: veiculo.ano,
      modelo: veiculo.modelo,
      marca: veiculo.marca,
      combustivel: {
        id: veiculo.combustivel.id,
        nome: veiculo.combustivel.nome,
      },
      ultimaKm: veiculo.ultimaKm,
      corInterna: veiculo.corInterna,
      corExterna: veiculo.corExterna,
      numMotorInterno: veiculo.numMotorInterno,
      numMotorExterno: veiculo.numMotorExterno,
      rastreador:  veiculo.rastreador,
      bloqueador:  veiculo.bloqueador,
      dataAquisicao: veiculo.dataAquisicao,
      condicao: veiculo.condicao,
      valorCompra: veiculo.valorCompra,
      ValorReforma: veiculo.ValorReforma,
      valorMercado: veiculo.valorMercado,
      nomeVendedor: veiculo.nomeVendedor,
      teleVendedor: veiculo.teleVendedor,
      descricao: veiculo.descricao,
    });
  }

  onSubmit() {
    this.serviceVeiculo.save(this.form.value)
    .subscribe({ next: (_result => this.onSucces()), error: (_error => this.onError()) });
  }

  onFileSelected(event: any) {
    const selectedFiles = event.srcElement.files;
    this.files = new Array();
    
    console.log(this.files);
    for (let x=0; x < selectedFiles.length; x++) {
      this.files.push(selectedFiles[x]);
    }
  }

  onDeleteFile(index: any) {  
    this.files.splice(index, 1);
  }

  onSaveFile() {
    if (this.files) {
      this.serviceVeiculo.fileUpload(this.files, 'http://localhost:3000/files-veiculo')
      .subscribe(response => this.snackBar.open('Arquivo adicionado com sucesso!', '', { duration: 2000 }));
      this.onCancel();
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSucces() {
    this.snackBar.open('Veículo Cadastrado com Sucesso', '', { duration: 2000 });
    this.IsDisabled = false;
    this.IsFormDisabled = true;
    this.form.disable();
  }

  private onError() {
    this.snackBar.open('Error ao Cadastrar Veículo', '', { duration: 5000 });
  }

  getErrorMessage (fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    return 'Campo Inválido';
  }
}
