import { Component, OnInit } from '@angular/core';
import { MyAlertService } from '../../core/my-alert.service';

import { ProductService } from '../shared/product.service';

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
  condition: boolean = false;

  public maxSize:number = 5;
  public bigTotalItems:number = 175;
  public bigCurrentPage:number = 1;
  public numPages:number = 0;

  constructor(
    private productService: ProductService,
    private myAlertService: MyAlertService
  ) {}
  myAlert() {
    this.myAlertService.confirmDialog('confirm', function (e) {
      console.log('kkkkkkkkk');
    });
  }
  myAlert2() {
    this.myAlertService.errorMsg('errrrr');
  }

  // 上架下架
  public onSale(product, type) {
    var that = this;
    var message = '确定上架该商品？';
    if(type === 0) {
      message = '确定下架该商品？';
    }
    that.myAlertService.confirmDialog(message, function (e) {
      that.saleData = {
        type: type,
        product: product
      };
      that.myAlertService.errorMsg('失败');
    });
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
