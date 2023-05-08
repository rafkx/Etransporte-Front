import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from '../veiculo-service/veiculo.service';

@Component({
  selector: 'app-veiculo-detailed',
  templateUrl: './veiculo-detailed.component.html',
  styleUrls: ['./veiculo-detailed.component.css']
})
export class VeiculoDetailedComponent implements OnInit {

  veiculo: Veiculo | undefined;
  files: File[] | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private veiculoService: VeiculoService
  ) {}

  ngOnInit() {
    this.veiculo = this.route.snapshot.data['veiculo'];
  }

  onFileSelected(event: any) {
    const selectedFiles = <FileList>event.srcElement.files;
    this.files = new Array();
    for (let x=0; x < selectedFiles.length; x++) {
      this.files.push(selectedFiles[x]);
    }
  }

  onUpload() {
    if (this.files) {
      this.veiculoService.fileUpload(this.files, 'http://localhost:3000/veiculo/file')
      .subscribe(response => console.log('Upload Concluído'));
    }
  }

}
