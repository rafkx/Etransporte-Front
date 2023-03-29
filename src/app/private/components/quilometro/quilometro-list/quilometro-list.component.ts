import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quilometro } from 'src/app/models/quilometro';

@Component({
  selector: 'app-quilometro-list',
  templateUrl: './quilometro-list.component.html',
  styleUrls: ['./quilometro-list.component.css']
})
export class QuilometroListComponent {

  @Input() quilometros: Quilometro[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  readonly displayedColumns = ['quantKm', 'data', 'veiculo', 'actions'];

  constructor() { }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(quilometro: Quilometro) {
    this.edit.emit(quilometro);
  }

  onDelete(quilometro: Quilometro) {
    this.remove.emit(quilometro);
  }
}
