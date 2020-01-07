import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalRef } from 'ngx-bootstrap/modal';


import { TradeService } from '../shared/trade.service';
//import { Order } from '../trade';


@Component({
  selector: 'trade-list',
  templateUrl: './list.component.html',
  styleUrls: ['list.component.scss'],
// Angular 4.X拥有多级依赖注入系统，在一个注入器的范围内，依赖都是单例的。
// 它使用冒泡机制，当一个组件申请获得一个依赖时，Angular 先尝试用该组件自己的注入器来满足它。
// 如果该组件的注入器没有找到对应的提供商，它就把这个申请转给它父组件的注入器来处理。
// 如果那个注入器也无法满足这个申请，它就继续转给它的父组件的注入器，
// 即会先在component中找TradeService，找不到再去module中找，
// 区别在不同的地方注入同样的Service，会使用不同的实例，所以会导致结果可能不同，
// 即在component注入，service结果只在当前component中起作用，在module中注入，
// 结果会在module下的所有component中起作用
// providers: [TradeService] //在ngModule里面写
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
  order = {};
  selectedHero = '';


  public maxSize:number = 5;
  public bigTotalItems:number = 175;
  public bigCurrentPage:number = 1;
  public numPages:number = 0;

  constructor(
    private modalService: BsModalService,
    private tradeService: TradeService
  ) {}
  getOrder(): void {
    // this.tradeService
    //   .getOrder(1)
    //   .then(orders => {
    //     console.log(orders);
    //     return this.order = orders;
    //   });
  }
  save(): void {
    // this.tradeService.update(1111)
    //   .then(() => this.goBack());
  }
  goBack(): void {

  }
  add(name: string): void {
    name = name.trim();
    if(!name) {return}
    // this.tradeService.create(name)
    //   .then(hero => {
    //     this.heros.push(hero);
    //     this.selectedHero = null;
    //   })
  }
  getOrders(data: any) {
    // this.tradeService
    //   .getOrders(data)
    //   .then(orders => {
    //     console.log(orders);
    //     return this.orderList = orders;
    //   });
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
