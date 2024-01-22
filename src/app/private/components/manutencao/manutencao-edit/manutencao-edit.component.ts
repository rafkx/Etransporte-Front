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
  selector: 'app-manutencao-edit',
  templateUrl: './manutencao-edit.component.html',
  styleUrls: ['./manutencao-edit.component.css']
})
export class ManutencaoEditComponent implements OnInit {
  
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
    veiculo: [{}, [Validators.required]]
  });

  veiculos: Veiculo[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private servico: ManutencaoService,
    private veiculoService: VeiculoService,
    private fornecedorService: FornecedorService,
    private pecaService: PecaService,
    private servicoService: ServicoServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    this.veiculoService.getVeiculos().subscribe(veiculos => this.veiculos = veiculos);
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
      veiculo: manutencao.veiculo
    })
  }

  onSubmit() {
    this.servico.update({
      id: this.id.value,
      descricao: this.descricao.value,
      data: this.data.value,
      km: {
        id: this.kmId.value,
        quantKm: this.quantKm.value,
        data: this.data.value,
        veiculo: this.veiculo.value
      },
      tipo: this.tipo.value,
      veiculo: this.veiculo.value
    })
    .subscribe({ next: (_result => this.onSucces()), error: (_error => this.onError()) })
  }

  onCancel() {
    this.router.navigateByUrl('/private/manutencao');
  }

  goBack() {
    this.router.navigateByUrl('/private/manutencao')
  }

  private onSucces() {
    this.snackBar.open('Manutenção atualizada com sucesso', '', { duration: 2000 });
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

}
