import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quilometro } from 'src/app/models/quilometro';

@Component({
  selector: 'app-quilometro-detailed',
  templateUrl: './quilometro-detailed.component.html',
  styleUrls: ['./quilometro-detailed.component.css']
})
export class QuilometroDetailedComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  quilometro: Quilometro | undefined;

  ngOnInit() {
    this.quilometro = this.route.snapshot.data['quilometro']
  }
}
