import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from './model/funcionario';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  funcionario$: Observable<any> | undefined;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.funcionario$ = this.funcionarioService.getFuncionarios();
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(funcionario: Funcionario) {
    this.router.navigate([funcionario.id], { relativeTo: this.route });
  }
}
