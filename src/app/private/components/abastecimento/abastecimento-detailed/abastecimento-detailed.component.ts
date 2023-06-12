import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Abastecimento } from 'src/app/models/abastecimento';

@Component({
  selector: 'app-abastecimento-detailed',
  templateUrl: './abastecimento-detailed.component.html',
  styleUrls: ['./abastecimento-detailed.component.css']
})
export class AbastecimentoDetailedComponent implements OnInit {

  abastecimento: Abastecimento | undefined;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.abastecimento = this.route.snapshot.data['abastecimento'];
  }

}
