import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Veiculo } from '../model/veiculo';

@Component({
  selector: 'app-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css']
})
export class VeiculoListComponent implements OnInit {
  
  @Input() veiculos: Veiculo[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  readonly displayedColumns = ['placa', 'ano', 'modelo', 'actions'];

  constructor () { }
  
  ngOnInit(): void {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(veiculo: Veiculo) {
    this.edit.emit(veiculo);
  }

  onDelete(veiculo: Veiculo) {
    this.remove.emit(veiculo);
  }

}
