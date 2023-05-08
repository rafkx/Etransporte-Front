import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Peca } from 'src/app/models/peca';
import { PecaService } from '../peca-service/peca.service';

@Component({
  selector: 'app-peca-detailed',
  templateUrl: './peca-detailed.component.html',
  styleUrls: ['./peca-detailed.component.css']
})
export class PecaDetailedComponent implements OnInit {

  peca: Peca | undefined;
  files: File[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private pecaService: PecaService,
  ) { }
  
  ngOnInit() {
    this.peca = this.route.snapshot.data['peca'];
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
      this.pecaService.fileUpload(this.files, 'http://localhost:3000/pecas/file')
      .subscribe(response => console.log('Upload Concluído'));
    }
  }
}
