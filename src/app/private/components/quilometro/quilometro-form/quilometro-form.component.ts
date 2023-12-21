import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Quilometro } from 'src/app/models/quilometro';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from '../../../services/veiculo-service/veiculo.service';
import { QuilometroService } from '../../../services/quilometro-service/quilometro.service';
import { FileQuilometro } from 'src/app/models/file_quilometro';

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
    veiculo: [{}, [Validators.required]]
  })

  veiculos: Veiculo[] | undefined;
  file: FileQuilometro | null | undefined;
  IsDisabled: boolean = true;
  IsFormDisabled: boolean = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private quilometroService: QuilometroService,
    private veiculoService: VeiculoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
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
    
  }

  onFileSelected(event: any) {
    const selectedFiles = event.srcElement.files;
    
    for (let x=0; x < selectedFiles.length; x++) {
      this.file = selectedFiles[0];
    }
  }

  onDeleteFile() {
    this.file = null;
    console.log(this.file);
  }

  onSaveFile() {
    if (this.file) {
      this.quilometroService.fileUpload(this.file, 'http://localhost:3000/files-quilometro')
      .subscribe(response => this.snackBar.open('Arquivo adicionado com sucesso!', '', { duration: 2000 }))
      this.onCancel();
    } else {
      this.snackBar.open('Sem nenhum arquivo! Selecione um arquivo diferente!', 'X', { duration: 5000 });
    }
  }

  onCancel() {
    this.location.back()
  }

  goBack() {
    this.router.navigateByUrl('/private/quilometro')
  }

  private onSuccess() {
    this.snackBar.open('Quilometro cadastrado com sucesso', '', { duration: 2000 });
    this.IsDisabled = false;
    this.IsFormDisabled = true;
    this.form.disable();
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
