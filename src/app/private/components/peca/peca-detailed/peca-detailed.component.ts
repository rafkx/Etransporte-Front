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

  constructor(
    private route: ActivatedRoute,
    private pecaService: PecaService,
  ) { }
  
  ngOnInit() {
    this.peca = this.route.snapshot.data['peca'];
  }
}
