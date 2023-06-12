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

  
  constructor(
    private route: ActivatedRoute,
    private veiculoService: VeiculoService
  ) {}

  ngOnInit() {
    this.veiculo = this.route.snapshot.data['veiculo'];
  }

}
