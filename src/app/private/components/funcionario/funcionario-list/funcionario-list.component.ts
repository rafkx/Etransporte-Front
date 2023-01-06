import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Funcionario } from '../model/funcionario';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css']
})
export class FuncionarioListComponent implements OnInit {

  @Input() funcionarios: Funcionario[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  @Output() redirect = new EventEmitter(false);
  readonly displayedColumns = ['nomeFun', 'cpf', 'actions'];

  constructor() { }


  ngOnInit(): void {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(funcionario: Funcionario) {
    this.edit.emit(funcionario);
  }

  onDelete(funcionario: Funcionario) {
    this.remove.emit(funcionario)
  }

  onClick(funcionario: Funcionario) {
    this.redirect.emit(funcionario);
  }
}
