import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Manutencao } from 'src/app/models/manutencao';
import { Peca } from 'src/app/models/peca';
import { Servico } from 'src/app/models/servico';
import { Veiculo } from 'src/app/models/veiculo';
import { FornecedorService } from 'src/app/private/services/fornecedor-service/fornecedor.service';
import { ManutencaoService } from 'src/app/private/services/manutencao-service/manutencao.service';
import { PecaService } from 'src/app/private/services/peca-service/peca.service';
import { ServicoServiceService } from 'src/app/private/services/servico-service/servico-service.service';
import { VeiculoService } from 'src/app/private/services/veiculo-service/veiculo.service';

@Component({
  selector: 'app-manutencao-form',
  templateUrl: './manutencao-form.component.html',
  styleUrls: ['./manutencao-form.component.css']
})
export class ManutencaoFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: [''],
    descricao: ['', [Validators.required]],
    data: ['', [Validators.required]],
    km: this.formBuilder.group({
      id: [''],
      quantKm: [0, [Validators.required]],
      data: [''],
      veiculo: [{}]
    }),
    tipo: ['', [Validators.required]],
    veiculo: [{}, [Validators.required]],
    itensPeca: this.formBuilder.array([]),
    itensServico: this.formBuilder.array([]),
  });

  formPeca(): FormGroup {
    return this.formBuilder.group({
      descricao: ['', [Validators.required]],
      prazoKm: [0],
      prazoMeses: [0],
      valor: [0, [Validators.required]],
      fornecedor: [{}, [Validators.required]],
      peca: [{}, [Validators.required]],
    });
  }

  formServico(): FormGroup {
    return this.formBuilder.group({
      descricao: ['', [Validators.required]],
      prazoKm: [0],
      prazoMeses: [0],
      valor: [0, [Validators.required]],
      fornecedor: [{}, [Validators.required]],
      servico: [{}, [Validators.required]],
    });
  }

  selectedValue: string = '';
  veiculos: Veiculo[] = [];
  fornecedores: Fornecedor[] = [];
  pecas: Peca[] = [];
  servicos: Servico[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private manutencaoService: ManutencaoService,
    private veiculoService: VeiculoService,
    private fornecedorService: FornecedorService,
    private pecaService: PecaService,
    private servicoService: ServicoServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.veiculoService.getVeiculos().subscribe(veiculos => this.veiculos = veiculos);
    this.fornecedorService.getFornecedores().subscribe(fornecedores => this.fornecedores = fornecedores);
    this.pecaService.getPecas().subscribe(pecas => this.pecas = pecas);
    this.servicoService.getServicos().subscribe(servicos => this.servicos = servicos);
  }

  onSubmit() {
    this.manutencaoService.create({
      descricao: this.descricao.value,
      data: this.data.value,
      km: {
        quantKm: this.quantKm.value,
        data: this.data.value,
        veiculo: this.veiculo.value,
      },
      tipo: this.tipo.value,
      veiculo: this.veiculo.value,
      itensPeca: this.itensPeca.value,
      itensServico: this.itensServico.value
    })
    .subscribe({ next: (_result => this.onSucces()), error: (_error => this.onError()) });
  }

  onCancel() {
    this.router.navigateByUrl('/private/manutencao');
  }

  goBack() {
    this.router.navigateByUrl('/private/manutencao')
  }

  addPeca() {
    this.itensPeca.push(this.formPeca());
  }

  addServico() {
    this.itensServico.push(this.formServico());
  }

  private onSucces() {
    this.snackBar.open('Manutenção cadastrada com sucesso', '', { duration: 2000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Error ao cadastar manutenção', '', { duration: 5000 });
  }

  get id(): FormControl{
    return this.form.get('id') as FormControl;
  }

  get descricao(): FormControl{
    return this.form.get('descricao') as FormControl;
  }

  get data(): FormControl{
    return this.form.get('data') as FormControl;
  }
  get tipo(): FormControl{
    return this.form.get('tipo') as FormControl;
  }

  get veiculo(): FormControl{
    return this.form.get('veiculo') as FormControl;
  }

  get km(): FormGroup{
    return this.form.get('km') as FormGroup;
  }
  get kmId(): FormControl{
    return this.km.get('id') as FormControl;
  }
  get quantKm(): FormControl{
    return this.km.get('quantKm') as FormControl;
  }

  get itensPeca(): FormArray {
    return this.form.get('itensPeca') as FormArray;
  }

  get itensServico(): FormArray {
    return this.form.get('itensServico') as FormArray;
  }

  getErrorMessage (fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    return 'Campo inválido';
  }
  
}
