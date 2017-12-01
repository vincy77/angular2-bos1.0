import { Component, OnInit } from '@angular/core';

import { Product } from '../shared/product';
import { MyAlertService } from '../../core/my-alert.service';
import { ProductService } from '../shared/product.service';


@Component({
  selector: 'product-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.less']
})
export class ProductAddComponent implements OnInit {
  //除了使用了变量赋值的方式初始化组件，还可以使用构造函数constructor()来声明和初始化属性
  proCategorys = [
    {id: 1, text: '绿茶'},
    {id: 2, text: '红茶'},
    {id: 3, text: '乌龙茶'},
    {id: 4, text: '黑茶'},
    {id: 5, text: '白茶'},
    {id: 6, text: '黄茶'},
    {id: 7, text: '花茶'},
    {id: 8, text: '药茶'}];
  productData = new Product('', '', '', '', 100);
  submitted = false;

  constructor(
    private productService: ProductService,
    private myAlertService: MyAlertService

  ) { }


  selectChange(item) {
    this.productData.proCategory = item.id;
    console.log(item);
  }
  onSubmit(productForm) {
    let that = this;
    this.myAlertService.confirmDialog('确认提交吗？', function (e) {
      that.submitted = true;
      console.log(productForm.value);
      console.log(that.productData);
      //name = name.trim();
      //if(!name) {return}
      that.productService.create(that.productData)
        .then(hero => {
          //this.heros.push(hero);
          //this.selectedHero = null;
          that.myAlertService.successMsg('添加成功！');
        });
    });
  }
  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }



  ngOnInit() {
    console.log(this.productService.isLoggedIn);
    this.productService.login();
    console.log(this.productService.isLoggedIn);
  }

}
