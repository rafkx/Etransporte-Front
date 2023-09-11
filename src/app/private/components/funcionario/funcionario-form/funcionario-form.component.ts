import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from '../funcionario-service/funcionario.service';
import { FileFuncionario } from 'src/app/models/file_funcionario';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: [''],
    nomeFun: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    rg: ['', [Validators.required]],
    telefone: [''],
    sexoFun: [''],
    dataNasciFun: ['', [Validators.required]],
    tituloEleitor: [''],
    estadoCivil: [''],
    grauInstrucao: [''],
    rua: [''],
    bairro: [''],
    cep: [''],
    numero: [0],
    city: [''],
    funcao: ['', [Validators.required]],
    salario: [0, [Validators.required]],
    dataAdmissao: ['', [Validators.required]],
    horarioTrabalho: [''],
    intervaloTrabalho: [''],
    contratoExpe: [0],
    valeTrans: [0],
    valeAlimen: [0],
    numCarteiraTrab: [''],
    serieCarteiraTrab: [''],
    estadoCarteiraTrab: [''],
  });

  files: FileFuncionario[] | undefined;
  IsDisabled: boolean = true;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private serviceFuncionario: FuncionarioService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  

  ngOnInit(): void {
    const funcionario: Funcionario = this.route.snapshot.data['funcionario'];
    this.form.patchValue({
      id: funcionario.id,
      nomeFun: funcionario.nomeFun,
      cpf: funcionario.cpf,
      rg: funcionario.rg,
      telefone: funcionario.telefone,
      sexoFun: funcionario.sexoFun,
      dataNasciFun: funcionario.dataNasciFun,
      tituloEleitor: funcionario.tituloEleitor,
      estadoCivil: funcionario.estadoCivil,
      grauInstrucao: funcionario.grauInstrucao,
      rua: funcionario.rua,
      bairro: funcionario.bairro,
      cep: funcionario.cep,
      numero: funcionario.numero,
      city: funcionario.city,
      funcao: funcionario.funcao,
      salario: funcionario.salario,
      dataAdmissao: funcionario.dataAdmissao,
      horarioTrabalho: funcionario.horarioTrabalho,
      intervaloTrabalho: funcionario.intervaloTrabalho,
      contratoExpe: funcionario.contratoExpe,
      valeTrans: funcionario.valeTrans,
      valeAlimen: funcionario.valeAlimen,
      numCarteiraTrab: funcionario.numCarteiraTrab,
      serieCarteiraTrab: funcionario.serieCarteiraTrab,
      estadoCarteiraTrab: funcionario.estadoCivil
    });
  }

  onSubmit() { 
      this.serviceFuncionario.save(this.form.value)
      .subscribe({ next: (_result => this.onSuccess()), error: (_error => this.onError()) });
    
  }

  onFileSelected(event: any) {
    const selectedFiles = event.srcElement.files;
    this.files = new Array();

    for (let x=0; x < selectedFiles.length; x++) {
      this.files.push(selectedFiles[x]);
    }

    if (this.files) {
      this.serviceFuncionario.fileUpload(this.files, 'http://localhost:3000/files-funcionario')
      .subscribe(response => console.log('Upload Concluído'));
      this.onCancel();
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Funcionário Cadastrado com Sucesso', '', { duration: 2000 });
    this.IsDisabled = false;
  }

  private onError() {
    this.snackBar.open('Erro ao Cadastrar Funcionário', '', { duration: 5000 });
  }

  getErrorMessage (fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    return 'Campo Inválido';
  }

}
