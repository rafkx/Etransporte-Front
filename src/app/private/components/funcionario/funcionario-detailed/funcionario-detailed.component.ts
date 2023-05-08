import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from '../funcionario-service/funcionario.service';

@Component({
  selector: 'app-funcionario-detailed',
  templateUrl: './funcionario-detailed.component.html',
  styleUrls: ['./funcionario-detailed.component.css']
})
export class FuncionarioDetailedComponent implements OnInit {

  funcionario: Funcionario | undefined;

  constructor( 
    private serviceFuncionario: FuncionarioService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
     this.funcionario = this.route.snapshot.data['funcionario'];
     console.log(this.funcionario)
  }



}
