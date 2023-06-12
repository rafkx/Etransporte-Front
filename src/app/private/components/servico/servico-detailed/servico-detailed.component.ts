import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servico } from 'src/app/models/servico';

@Component({
  selector: 'app-servico-detailed',
  templateUrl: './servico-detailed.component.html',
  styleUrls: ['./servico-detailed.component.css']
})
export class ServicoDetailedComponent implements OnInit {

  servico: Servico | undefined;

  constructor(
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    this.servico = this.route.snapshot.data['servico'];
  }
  
}
