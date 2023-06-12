import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Quilometro } from 'src/app/models/quilometro';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from '../../veiculo/veiculo-service/veiculo.service';
import { QuilometroService } from '../quilometro-service/quilometro.service';

@Component({
  selector: 'app-quilometro-form',
  templateUrl: './quilometro-form.component.html',
  styleUrls: ['./quilometro-form.component.css']
})
export class QuilometroFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: [''], 
    quantKm: [0, [Validators.required]],
    data: ['', [Validators.required]],
    veiculo: [{}]
  })

  veiculos: Veiculo[] | undefined;
  file: File | undefined;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private quilometroService: QuilometroService,
    private veiculoService: VeiculoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.veiculoService.getVeiculos().subscribe(veiculos => this.veiculos = veiculos);
    const quilometro: Quilometro = this.route.snapshot.data['quilometro'];
    this.form.patchValue({
      id: quilometro.id,
      quantKm: quilometro.quantKm,
      data: quilometro.data,
      veiculo: quilometro.veiculo,
    })
  }

  onSubmit() {
    this.quilometroService.save({
      id: this.id.value,
      quantKm: this.quantKm.value,
      data: this.data.value,
      veiculo: this.veiculo.value,
    }).subscribe({ next: (result => this.onSuccess()), error: (error => this.onError()) });
    if (this.file) {
      this.quilometroService.fileUpload(this.file, 'http://localhost:3000/quilometro/file')
      .subscribe(response => console.log('Upload Concluído'))
    }
  }

  onFileSelected(event: any) {
    const selectedFiles = <FileList>event.srcElement.files;
    this.file = selectedFiles[0];
  }

  onCancel() {
    this.location.back()
  }

  private onSuccess() {
    this.snackBar.open('Quilometro cadastrado com sucesso', '', { duration: 2000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao cadastrar quilometro', '', { duration: 5000 });
  }

  get id(): FormControl{
    return this.form.get('id') as FormControl;
  }
  get quantKm(): FormControl{
    return this.form.get('quantKm') as FormControl;
  }
  get data(): FormControl{
    return this.form.get('data') as FormControl;
  }
  get veiculo(): FormControl{
    return this.form.get('veiculo') as FormControl;
  }
}
