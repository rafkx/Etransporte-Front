import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Manutencao, ManutencaoData } from 'src/app/models/manutencao';

@Component({
  selector: 'app-manutencao-list',
  templateUrl: './manutencao-list.component.html',
  styleUrls: ['./manutencao-list.component.css']
})
export class ManutencaoListComponent implements OnInit {

  @Input() manutencoes!: ManutencaoData;
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  readonly displayedColumns = ['data', 'descricao', 'tipo', 'veiculo', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(manutencao: Manutencao) {
    this.edit.emit(manutencao);
  }

  onDelete(manutencao: Manutencao) {
    this.remove.emit(manutencao);
  }

}
