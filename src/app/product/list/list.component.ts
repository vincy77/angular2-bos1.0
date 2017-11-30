//import { Component, OnInit } from '@angular/core';
import {
  Component, OnInit, AfterViewInit
} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { MyAlertService } from '../../core/my-alert.service';

import { ProductService } from '../shared/product.service';
//import { Order } from '../trade';


@Component({
  selector: 'product-list',
  templateUrl: './list.component.html',
  styleUrls: ['list.component.less'],
  providers: [
    //ProductService
  ]
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
  //上下架弹窗数据
  saleData = {};
  productList = [];

  public maxSize:number = 5;
  public bigTotalItems:number = 175;
  public bigCurrentPage:number = 1;
  public numPages:number = 0;

  constructor(
    private modalService: BsModalService,
    private productService: ProductService,
    private myAlertService: MyAlertService
  ) {}
  myAlert() {
    this.myAlertService.error('errrrr');
  }

  onSubmit() {
    console.log(this.saleData);
  }

  //查看地址弹窗
 // public viewAddrModalRef: BsModalRef;
  public saleModalref: BsModalRef;

  // 上架下架
  public onSale(template, product, type) {
    this.saleData = {
      type: type,
      product: product,
      message: '确定上架该商品？'
    };
    this.saleModalref = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirm(): void {
    //this.message = 'Confirmed!';
    this.saleModalref.hide();
  }

  decline(): void {
    //this.message = 'Declined!';
    this.saleModalref.hide();
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
  getProducts(data: any) {
    this.productService
      .getProducts(data)
      .then(products=> {
        console.log(products);
        return this.productList = products;
      });
  }


  ngOnInit() {
    console.log(this.nav.current);
    this.getProducts(0);
    console.log(this.productService.isLoggedIn);
    this.productService.login();
    console.log(this.productService.isLoggedIn);


  }

}
