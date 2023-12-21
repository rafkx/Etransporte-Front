import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from 'src/app/models/fornecedor';

@Component({
  selector: 'app-fornecedor-detailed',
  templateUrl: './fornecedor-detailed.component.html',
  styleUrls: ['./fornecedor-detailed.component.css']
})
export class FornecedorDetailedComponent implements OnInit {

  fornecedor!: Fornecedor;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.fornecedor = this.route.snapshot.data['fornecedor'];
  }

  goBack() {
    this.router.navigateByUrl('/private/fornecedor')
  }
}
