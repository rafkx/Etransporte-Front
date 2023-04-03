import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Servico } from 'src/app/models/servico';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css']
})
export class ServicoListComponent implements OnInit {
  
  @Input() servicos: Servico[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  readonly displayedColumns = ['descricao', 'fornecedor', 'veiculo', 'actions'];

  constructor() { }
  
  ngOnInit(): void {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(servico: Servico) {
    this.edit.emit(servico);
  }

  onDelete(servico: Servico) {
    this.remove.emit(servico);
  }
}

