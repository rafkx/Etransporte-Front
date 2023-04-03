import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Abastecimento } from 'src/app/models/abastecimento';

@Component({
  selector: 'app-abastecimento-list',
  templateUrl: './abastecimento-list.component.html',
  styleUrls: ['./abastecimento-list.component.css']
})
export class AbastecimentoListComponent {

  @Input() abastecimentos: Abastecimento[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  readonly displayedColumns = ['data', 'veiculo', 'total', 'actions'];

  constructor() { }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(abastecimento: Abastecimento) {
    this.edit.emit(abastecimento);
  }

  onDelete(abastecimento: Abastecimento) {
    this.remove.emit(abastecimento);
  }

}
