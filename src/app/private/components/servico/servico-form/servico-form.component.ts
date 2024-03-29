import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Servico } from 'src/app/models/servico';
import { Veiculo } from 'src/app/models/veiculo';
import { FornecedorService } from '../../../services/fornecedor-service/fornecedor.service';
import { VeiculoService } from '../../../services/veiculo-service/veiculo.service';
import { ServicoServiceService } from '../../../services/servico-service/servico-service.service';
import { FileServico } from 'src/app/models/file_servico';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.css']
})
export class ServicoFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: [''],
    descricao: ['', [Validators.required]],
    cod: ['', [Validators.required]],
    fornecedor: [[{
      id: ''
    }], [Validators.required]],
    veiculo: [[{
      id: ''
    }], [Validators.required]]
  })

  fornecedores: Fornecedor[] | undefined;
  veiculos: Veiculo[] | undefined;
  files: FileServico[] = [];
  IsDisabled: boolean = true;
  IsFormDisabled: boolean = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private serviceServico: ServicoServiceService,
    private serviceVeiculo: VeiculoService,
    private serviceFornecedor: FornecedorService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.serviceFornecedor.getFornecedores().subscribe(fornecedores => this.fornecedores = fornecedores);
    this.serviceVeiculo.getVeiculos().subscribe(veiculos => this.veiculos = veiculos);
    const servico: Servico = this.route.snapshot.data['servico'];
    this.form.patchValue({
      id: servico.id,
      descricao: servico.descricao,
      cod: servico.cod,
      fornecedor: servico.fornecedor,
      veiculo: servico.veiculo
    })
  }

  onSubmit() {
    this.serviceServico.save({
      id: this.id.value,
      descricao: this.descricao.value,
      cod: this.cod.value,
      fornecedor: [this.fornecedor.value],
      veiculo: [this.veiculo.value]
    })
    .subscribe({ next: (_result => this.onSuccess()), error: (_error => this.onError()) });
  }

  onFileSelected(event: any) {
    const selectedFiles = event.srcElement.files;
    this.files = new Array();
    
    for (let x=0; x < selectedFiles.length; x++) {
      this.files.push(selectedFiles[x]);
    }    
  }

  onDeleteFile(index: any) {
    this.files.splice(index, 1);
    console.log(this.files);
  }

  onSaveFile() {
    if (this.files) {
      this.serviceServico.fileUpload(this.files, 'http://localhost:3000/files-servico')
      .subscribe(response => this.snackBar.open('Arquivo adicionado com sucesso!', '', { duration: 2000 }))
      this.onCancel();
    }
  }

  onCancel() {
    this.location.back();
  }

  goBack() {
    this.router.navigateByUrl('/private/servico')
  }

  private onSuccess() {
    this.snackBar.open('Serviço cadastrado com sucesso', '', { duration: 2000 });
    this.IsDisabled = false;
    this.IsFormDisabled = true;
    this.form.disable();
  }

  private onError() {
    this.snackBar.open('Erro ao cadastrar serviço', '', { duration: 5000 });
  }

  get id(): FormControl{
    return this.form.get('id') as FormControl;
  }

  get descricao(): FormControl{
    return this.form.get('descricao') as FormControl;
  }

  get cod(): FormControl{
    return this.form.get('cod') as FormControl;
  }

  get fornecedor(): FormControl{
    return this.form.get('fornecedor') as FormControl;
  }

  get veiculo(): FormControl{
    return this.form.get('veiculo') as FormControl;
  }
}
