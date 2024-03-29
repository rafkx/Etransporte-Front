import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peca, PecaData } from 'src/app/models/peca';

@Component({
  selector: 'app-peca-list',
  templateUrl: './peca-list.component.html',
  styleUrls: ['./peca-list.component.css']
})
export class PecaListComponent {

  @Input() pecas!: PecaData;
  @Input() isAdmin!: boolean;
  @Input() isGerente!: boolean;
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  @Output() redirect = new EventEmitter(false);
  readonly displayedColumns = ['cod', 'nomePeca', 'descricao', 'actions'];

  constructor() { }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(peca: Peca) {
    this.edit.emit(peca);
  }

  onDelete(peca: Peca) {
    this.remove.emit(peca);
  }

  onRedirect(peca: Peca) {
    this.redirect.emit(peca);
  }
}
