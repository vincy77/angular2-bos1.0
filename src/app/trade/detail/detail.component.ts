import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trade-list',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css']
})
export class TradeDetailComponent implements OnInit {
  domain = window.location.hostname.toLowerCase();
  hostDomain = window.location.protocol + '//' + window.location.host;

  domainConfig = {
    'localhost': {
      localhost: 'http://restapi.test.com',
      jsonPath: '/static/json/dev/',
      WX: {
        appid: 'wx128899758d1e5819',
        _redirectServerUri: 'http://restapi.mdscj.com/uc/dispatch',
        state: this.hostDomain + '|test'
      }
    },
    '127.0.0.1': {
      localhost: 'http://qf-restapi.gamma.com',
      jsonPath: '/static/json/dev/',
      WX: {
        appid: 'wx128899758d1e5819',
        _redirectServerUri: 'http://qf-restapi.mdscj.com/uc/dispatch',
        state: this.hostDomain + '|gamma'
      }
    }
  }[this.domain] || {
      localhost: 'http://qf-restapi.test.com',
      jsonPath: '/static/json/dev/',
      WX: {
        appid: 'wx128899758d1e5819',
        _redirectServerUri: 'http://qf-restapi.mdscj.com/uc/dispatch',
        state: this.hostDomain + '|test'
      },
      isLocal: true
    };

  localhost = this.domainConfig.localhost;
  config = {
    trade: {
      list: this.localhost + 'trade/add',
      detail: this.localhost + 'trade/detail'
    },
    user: {
      list: this.localhost + 'user/add',
      detail: this.localhost + 'user/detail'
    }
  };
  constructor() { }

  ngOnInit() {
    console.log(this.domain);
    console.log(this.config.trade.list);
  }

}
