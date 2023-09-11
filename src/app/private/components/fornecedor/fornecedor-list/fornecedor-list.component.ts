import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fornecedor, FornecedorData } from 'src/app/models/fornecedor';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css']
})
export class FornecedorListComponent {

  @Input() fornecedores!: FornecedorData;
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  @Output() redirect = new EventEmitter(false);
  readonly displayedColumns = ['nome', 'endereco', 'contatos', 'actions'];

  constructor () { }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(fornecedor: Fornecedor) {
    this.edit.emit(fornecedor);
  }

  onDelete(fornecedor: Fornecedor) {
    this.remove.emit(fornecedor);
  }

  onRedirect(fornecedor: Fornecedor) {
    this.redirect.emit(fornecedor);
  }
}
