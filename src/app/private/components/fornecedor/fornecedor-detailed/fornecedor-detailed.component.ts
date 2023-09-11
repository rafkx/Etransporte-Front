import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fornecedor } from 'src/app/models/fornecedor';

@Component({
  selector: 'app-fornecedor-detailed',
  templateUrl: './fornecedor-detailed.component.html',
  styleUrls: ['./fornecedor-detailed.component.css']
})
export class FornecedorDetailedComponent implements OnInit {

  fornecedor!: Fornecedor;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fornecedor = this.route.snapshot.data['fornecedor'];
  }
}
