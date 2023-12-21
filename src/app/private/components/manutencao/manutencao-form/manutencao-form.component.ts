import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    itensPeca: this.formBuilder.group({
      id: [''],
      descricao: ['', [Validators.required]],
      prazoKm: [0],
      prazoMeses: [0],
      valor: [0, [Validators.required]],
      fornecedor: [{}, [Validators.required]],
      peca: [{}, [Validators.required]],
    }),
    itensServico: this.formBuilder.group({
      id: [''],
      descricao: ['', [Validators.required]],
      prazoKm: [0],
      prazoMeses: [0],
      valor: [0, [Validators.required]],
      fornecedor: [{}, [Validators.required]],
      servico: [{}, [Validators.required]],
    }),
  });

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
    const manutencao: Manutencao = this.route.snapshot.data['manutencao'];
    this.form.patchValue({
      id: manutencao.id,
      descricao: manutencao.descricao,
      data: manutencao.data,
      km: {
        id: manutencao.km.id,
        quantKm: manutencao.km.quantKm,
        data: manutencao.km.data,
        veiculo: manutencao.km.veiculo,
      },
      tipo: manutencao.tipo,
      veiculo: manutencao.veiculo,
      itensPeca: {
        id: manutencao.itensPeca[0].id,
        descricao: manutencao.itensPeca[0].descricao,
        prazoKm: manutencao.itensPeca[0].prazoKm,
        prazoMeses: manutencao.itensPeca[0].prazoMeses,
        valor: manutencao.itensPeca[0].valor,
        fornecedor: manutencao.itensPeca[0].fornecedor,
        peca: manutencao.itensPeca[0].peca
      },
      itensServico: {
        id: manutencao.itensServico[0].id,
        descricao: manutencao.itensServico[0].descricao,
        prazoKm: manutencao.itensServico[0].prazoKm,
        prazoMeses: manutencao.itensServico[0].prazoMeses,
        valor: manutencao.itensServico[0].valor,
        fornecedor: manutencao.itensServico[0].fornecedor,
        servico: manutencao.itensServico[0].servico
      },
    })
  }

  onSubmit() {
    if (this.selectedValue == 'peca') {
      this.manutencaoService.save({
        id: this.id.value,
        descricao: this.descricao.value,
        data: this.data.value,
        km: {
          id: this.kmId.value,
          quantKm: this.quantKm.value,
          data: this.data.value,
          veiculo: this.veiculo.value,
        },
        tipo: this.tipo.value,
        veiculo: this.veiculo.value,
        itensPeca: [{
          id: this.idItem.value,
          descricao: this.descricaoItem.value,
          prazoKm: this.prazoKmItem.value,
          prazoMeses: this.prazoMesesItem.value,
          valor: this.valorItem.value,
          fornecedor: this.fornecedorItem.value,
          peca: this.pecaItem.value
        }]
      })
      .subscribe({ next: (_result => this.onSucces()), error: (_error => this.onError()) });
    } else if (this.selectedValue == 'servico') {
      this.manutencaoService.save({
        id: this.id.value,
        descricao: this.descricao.value,
        data: this.data.value,
        km: {
          id: this.kmId.value,
          quantKm: this.quantKm.value,
          data: this.data.value,
          veiculo: this.veiculo.value,
        },
        tipo: this.tipo.value,
        veiculo: this.veiculo.value,
        itensServico: [{
          id: this.idServico.value,
          descricao: this.descricaoServico.value,
          prazoKm: this.prazoKmServico.value,
          prazoMeses: this.prazoMesesServico.value,
          valor: this.valorServico.value,
          fornecedor: this.fornecedorServico.value,
          servico: this.servicoServico.value
        }]
      })
      .subscribe({ next: (_result => this.onSucces()), error: (_error => this.onError()) });
    }
  }

  onCancel() {
    this.router.navigateByUrl('/private/manutencao');
  }

  goBack() {
    this.router.navigateByUrl('/private/manutencao')
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

  get itensPeca(): FormGroup {
    return this.form.get('itensPeca') as FormGroup;
  }
  get idItem(): FormControl{
    return this.itensPeca.get('id') as FormControl;
  }
  get descricaoItem(): FormControl{
    return this.itensPeca.get('descricao') as FormControl;
  }
  get prazoKmItem(): FormControl{
    return this.itensPeca.get('prazoKm') as FormControl;
  }
  get prazoMesesItem(): FormControl{
    return this.itensPeca.get('prazoMeses') as FormControl;
  }
  get valorItem(): FormControl{
    return this.itensPeca.get('valor') as FormControl;
  }
  get fornecedorItem(): FormControl{
    return this.itensPeca.get('fornecedor') as FormControl;
  }
  get pecaItem(): FormControl{
    return this.itensPeca.get('peca') as FormControl;
  }

  get itensServico(): FormGroup {
    return this.form.get('itensServico') as FormGroup;
  }
  get idServico(): FormControl {
    return this.itensServico.get('id') as FormControl;
  }
  get descricaoServico(): FormControl {
    return this.itensServico.get('descricao') as FormControl;
  }
  get prazoKmServico(): FormControl {
    return this.itensServico.get('prazoKm') as FormControl;
  }
  get prazoMesesServico(): FormControl {
    return this.itensServico.get('prazoMeses') as FormControl;
  }
  get valorServico(): FormControl {
    return this.itensServico.get('valor') as FormControl;
  }
  get fornecedorServico(): FormControl {
    return this.itensServico.get('fornecedor') as FormControl;
  }
  get servicoServico(): FormControl {
    return this.itensServico.get('servico') as FormControl;
  }
}
