import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FornecedorService } from '../fornecedor-service/fornecedor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from '../../contato/contato.service';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css']
})
export class FornecedorFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: [''],
    nome: ['', [Validators.required]],
    cnpj: ['', [Validators.required]],
    cpf: [''],
    endereco: ['', [Validators.required]],
    contatos: [[{
      id: ''
    }]]
  })

  contatos2: Contato[] | undefined;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private fornecedorService: FornecedorService,
    private contatoService: ContatoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.contatoService.getContatos().subscribe(contato => this.contatos2 = contato);
    const fornecedor = this.route.snapshot.data['fornecedor'];
    this.form.patchValue({
      id: fornecedor.id,
      nome: fornecedor.nome,
      cnpj: fornecedor.cnpj,
      endereco: fornecedor.endereco,
      contatos: fornecedor.contatos,
    })
  }

  onSubmit() {
    this.fornecedorService.save({
      id: this.id.value,
      nome: this.nome.value,
      cnpj: this.cnpj.value,
      cpf: this.cpf.value,
      endereco: this.endereco.value,
      contatos: [this.contatos.value],
    })
    .subscribe({ next: (result => this.onSuccess()), error: (error => this.onError()) });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Fornecedor cadastrado com sucesso', '', { duration: 2000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro as cadastrar fornecedor', '', { duration: 5000 });
  }

  get id(): FormControl{
    return this.form.get('id') as FormControl;
  }
  get nome(): FormControl{
    return this.form.get('nome') as FormControl;
  }
  get cnpj(): FormControl{
    return this.form.get('cnpj') as FormControl;
  }
  get cpf(): FormControl{
    return this.form.get('cpf') as FormControl;
  }
  get endereco(): FormControl{
    return this.form.get('endereco') as FormControl;
  }
  get contatos(): FormControl{
    return this.form.get('contatos') as FormControl;
  }

}
