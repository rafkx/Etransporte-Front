import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User, UserData } from 'src/app/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input() users!: UserData;
  @Output() add = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  readonly displayedColumns = ['name', 'email', 'role', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    this.add.emit(true);
  }

  onDelete(user: User) {
    this.remove.emit(user);
  }

}
