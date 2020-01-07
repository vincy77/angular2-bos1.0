import { Component, OnInit } from '@angular/core';

import { TradeService } from '../shared/trade.service';

@Component({
  selector: 'trade-list',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.scss']
})
export class TradeDetailComponent implements OnInit {

  data = {}
  constructor(private tradeService: TradeService) { }
  getHeros(data: any) {
    // this.tradeService
    //   .getHeros(data)
    //   .then(hero => {
    //     console.log(hero);
    //     return this.data = hero;
    //   });
  }
  ngOnInit() {
    this.getHeros(0);
  }

}
