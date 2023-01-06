import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FuncionarioService } from '../funcionario.service';
import { Funcionario } from '../model/funcionario';

@Component({
  selector: 'app-funcionario-detailed',
  templateUrl: './funcionario-detailed.component.html',
  styleUrls: ['./funcionario-detailed.component.css']
})
export class FuncionarioDetailedComponent implements OnInit {

  funcionario$!: Observable<any>;

  constructor( 
    private serviceFuncionario: FuncionarioService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const funcionario: Funcionario = this.route.snapshot.data['funcionario'];
  }



}
