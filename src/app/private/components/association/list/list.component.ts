import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizacaoVeiculo } from 'src/app/models/autorizacao-veiculo';
import { VeiculoService } from 'src/app/private/services/veiculo-service/veiculo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  autorizacoes: AutorizacaoVeiculo [] = [];
  readonly displayedColumns = ['funcionario', 'veiculo'];

  constructor(
    private veiculoService: VeiculoService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.veiculoService.getAutorizacoes().subscribe(autorizacoes => this.autorizacoes = autorizacoes)
  }

  onAdd() {
    this.route.navigateByUrl('/private/associate')
  }

  goBack() {
    this.route.navigateByUrl('/private/dashboard')
  }

}
