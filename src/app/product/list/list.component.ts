import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';


//import { ProductService } from '../product.service';
//import { Order } from '../trade';


@Component({
  selector: 'product-list',
  templateUrl: './list.component.html',
  styleUrls: ['list.component.less']
})
export class ProductListComponent implements OnInit {
  nav = {
    options: [
      {
        key: 0,
        value: '全部'
      },
      {
        key: 1,
        value: '已上架'
      },
      {
        key: 2,
        value: '已下架'
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
  productList = [];
  hero = '';
  selectedHero = '';


  public maxSize:number = 5;
  public bigTotalItems:number = 175;
  public bigCurrentPage:number = 1;
  public numPages:number = 0;

  constructor(
    private modalService: BsModalService,
    //private productService: ProductService
  ) {}


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
  }

  public pageChanged(event:any):void {
    console.log(this.nav);
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }


  ngOnInit() {
    console.log(this.nav.current);
    //this.getOrders(0);
  }

}
