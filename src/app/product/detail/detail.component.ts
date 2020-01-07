import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'product-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productData = {}
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private productService: ProductService
  ) { }

  goBack(){
    this.location.back();
  }
  /**
   * 获取商品信息
   * */
  getProductData(productId){
    let that = this;
    this.productService.getProData(productId).subscribe(res => {
      if(res.success){
        that.productData = res.data;
        // that.multipleSetectedImgUrl = res.data.productImg;
        // that.categoryTitle = res.data.categoryName;
      }
    })
  }
  ngOnInit() {
    // let productId = this.activatedRoute.snapshot.params['id'];
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    console.log(productId);
    this.getProductData(productId);
  }

}
