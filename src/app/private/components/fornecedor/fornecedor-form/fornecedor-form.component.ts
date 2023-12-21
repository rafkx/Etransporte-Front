import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FornecedorService } from '../../../services/fornecedor-service/fornecedor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from '../../../services/contato-service/contato.service';

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
    contatos: this.formBuilder.group({
      id: [''],
      nome: [''],
      apelido: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
  })

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private fornecedorService: FornecedorService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const fornecedor = this.route.snapshot.data['fornecedor'];
    this.form.patchValue({
      id: fornecedor.id,
      nome: fornecedor.nome,
      cnpj: fornecedor.cnpj,
      endereco: fornecedor.endereco,
      contatos: {
        id: fornecedor.contatos.id,
        nome: fornecedor.nome,
        apelido: fornecedor.contatos.apelido,
        telefone: fornecedor.contatos.telefone,
        email: fornecedor.contatos.email,
      },
    })
  }

  onSubmit() {
    this.fornecedorService.save({
      id: this.id.value,
      nome: this.nome.value,
      cnpj: this.cnpj.value,
      cpf: this.cpf.value,
      endereco: this.endereco.value,
      contatos: [{
        id: this.idContato.value,
        nome: this.nome.value,
        apelido: this.apelido.value,
        telefone: this.telefone.value,
        email: this.email.value,
      }],
    })
    .subscribe({ next: (result => this.onSuccess()), error: (error => this.onError()) });
  }

  onCancel() {
    this.location.back();
  }

  goBack() {
    this.router.navigateByUrl('/private/fornecedor')
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
  get contatos(): FormGroup{
    return this.form.get('contatos') as FormGroup;
  }
  get idContato(): FormControl{
    return this.contatos.get('id') as FormControl;
  }
  get nomeContato(): FormControl{
    return this.contatos.get('nome') as FormControl;
  }
  get apelido(): FormControl{
    return this.contatos.get('apelido') as FormControl;
  }
  get telefone(): FormControl{
    return this.contatos.get('telefone') as FormControl;
  }
  get email(): FormControl{
    return this.contatos.get('email') as FormControl;
  }
}
