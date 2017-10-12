import { Component, OnInit } from '@angular/core';

import { Product } from '../product';

@Component({
  selector: 'product-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.less']
})
export class ProductAddComponent implements OnInit {
  proCategorys = ['服饰', '食品', '家居', '美妆'];
  model = new Product('商品标题', '商品副标题', '商品分类', '商品图片链接', 100);
  submitted = false;



  onSubmit() {
    this.submitted = true;
    console.log(this.model);

  }

  constructor() { }

  ngOnInit() {
  }

}
