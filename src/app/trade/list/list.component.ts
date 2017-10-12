import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';


import { TradeService } from '../trade.service';
//import { Order } from '../trade';


@Component({
  selector: 'trade-list',
  templateUrl: './list.component.html',
  styleUrls: ['list.component.less']
})
export class TradeListComponent implements OnInit {
  nav = {
    options: [
      {
        key: 0,
        value: '全部'
      },
      {
        key: 1,
        value: '待付款'
      },
      {
        key: 2,
        value: '待发货'
      },
      {
        key: 3,
        value: '待收货'
      },
      {
        key: 4,
        value: '已完成'
      },
      {
        key: 5,
        value: '退货退款'
      }
    ],
    current: {
      key: 0,
      value: '全部'
    }
  };
  title = 'bos2';
  //发货弹窗数据
  deliverData = {};
  expressCompanys = [
    {
      name: '中通',
      key: 'zt'
    },
    {
      name: '圆通',
      key: 'yt'
    },
    {
      name: '申通',
      key: 'st'
    },
    {
      name: '韵达',
      key: 'yd'
    },
    {
      name: '顺丰',
      key: 'sf'
    }
  ];
  //查看地址弹窗显示数据
  viewAddressData = {};
  //订单列表
  orderList = [];
  // orders: Order[];
  orders = [];
  heros = [];
  hero = '';
  selectedHero = '';


  public maxSize:number = 5;
  public bigTotalItems:number = 175;
  public bigCurrentPage:number = 1;
  public numPages:number = 0;

  constructor(
    private modalService: BsModalService,
    private tradeService: TradeService
  ) {}

  save(): void {
    this.tradeService.update(this.hero)
      .then(() => this.goBack());
  }
  goBack(): void {

  }
  add(name: string): void {
    name = name.trim();
    if(!name) {return}
    this.tradeService.create(name)
      .then(hero => {
        this.heros.push(hero);
        this.selectedHero = null;
      })
  }
  getOrders(data: any) {
    this.tradeService
      .getOrders(data)
      .then(orders => {
        console.log(orders);
        return this.orderList = orders;
      });
  }

  onSubmit() {
    console.log(this.deliverData);
  }

  //查看地址弹窗
  public viewAddrModalRef: BsModalRef;
  public deliverModalref: BsModalRef;

  public deliver(template, order) {
    this.deliverData = {};
    this.deliverModalref = this.modalService.show(template);
  }

  public viewAddress(template, order) {
    console.log(order);
    this.viewAddressData = {
      consignee: order.consignee,
      consigneePhone: order.consigneePhone,
    };
    console.log(this.viewAddressData);
    this.viewAddrModalRef = this.modalService.show(template);
  }

  navChange(nav): void {
    console.log(this.title);
    // let test = this;
    // console.log(test);
    this.nav.current = nav;
    this.getOrders(nav.key);

  }

  public pageChanged(event:any):void {
    console.log(this.nav);
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }


  ngOnInit() {
    console.log(this.nav.current);
    this.getOrders(0);
  }

}
