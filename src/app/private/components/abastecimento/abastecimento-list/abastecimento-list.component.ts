import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Abastecimento, AbastecimentoData } from 'src/app/models/abastecimento';

@Component({
  selector: 'app-abastecimento-list',
  templateUrl: './abastecimento-list.component.html',
  styleUrls: ['./abastecimento-list.component.css']
})
export class AbastecimentoListComponent {

  @Input() abastecimentos!: AbastecimentoData;
  @Input() isAdmin!: boolean;
  @Input() isGerente!: boolean;
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  @Output() redirect = new EventEmitter(false); 
  readonly displayedColumns = ['data', 'veiculo', 'total', 'combustivel', 'actions'];

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

  onRedirect(abastecimento: Abastecimento) {
    this.redirect.emit(abastecimento);
  }
}
