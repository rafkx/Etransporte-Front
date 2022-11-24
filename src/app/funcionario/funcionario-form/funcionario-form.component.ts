import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../funcionario.service';
import { Funcionario } from '../model/funcionario';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: [''],
    nomeFun: [''],
    cpf: [''],
    rg: [''],
    telefone: [''],
    sexoFun: [''],
    dataNasciFun: [''],
    tituloEleitor: [''],
    estadoCivil: [''],
    grauInstrucao: [''],
    rua: [''],
    bairro: [''],
    cep: [''],
    numero: [''],
    city: [''],
    funcao: [''],
    salario: [0],
    dataAdmissao: [''],
    horarioTrabalho: [''],
    intervaloTrabalho: [''],
    contratoExpe: [0],
    valeTrans: [0],
    valeAlimen: [0],
    numCarteiraTrab: [''],
    serieCarteiraTrab: [''],
    estadoCarteiraTrab: [''],
  });

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

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Funcionário Cadastrado com Sucesso', '', { duration: 2000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao Cadastrar Funcionário', '', { duration: 5000 });
  }

}
