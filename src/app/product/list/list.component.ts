import { Component, OnInit, AfterViewInit,AfterContentChecked, AfterViewChecked, AfterContentInit, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import { MyAlertService } from '../../core/my-alert.service';
import { TreeService } from '../../core/service/tree.service';

import { ProductService } from '../shared/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './list.component.html',
  styleUrls: ['list.component.scss'],
  providers: [
    //ProductService
  ]
})
export class ProductListComponent implements OnInit, AfterViewInit,AfterContentChecked, AfterViewChecked, AfterContentInit, OnDestroy {
  nav = {
    options: [
      {
        key: 'ALL',
        value: '全部'
      },
      {
        key: 'ONSALE',
        value: '已上架'
      },
      {
        key: 'INSTOCK',
        value: '已下架'
      }
    ],
    current: {
      key: 'ALL',
      value: '全部'
    }
  };
  btnDisabled: boolean = false;
  batchType = 0;
  batchStatus = '';
  batchId = [];
  title = 'bos2';
  //上下架弹窗数据
  saleData = {};
  productList = [];
  condition: boolean = false;
  // 批量操作
  selectId = [];

  public itemsPerPage: number = 10;//每页显示几条数据（默认10）
  public maxSize:number = 5; //
  public bigTotalItems:number = 0;
  public bigCurrentPage:number = 1;
  public numPages:number = 0;

  //查看地址弹窗
  public proCategoryModalRef: BsModalRef;
  constructor(
    private productService: ProductService,
    private myAlertService: MyAlertService,
    private modalService: BsModalService,
    private treeService: TreeService,

  ) {}

  /**
   * 上架
   * */
  public onSale(product?) {
    let that = this;
    let productId = product ? [product.productId] : this.selectId;
    that.myAlertService.confirmDialog('确定上架该商品', function (e) {
      that.productService.onSaleProduct({productId: productId}).subscribe(res => {
        if(res.success){
          that.myAlertService.successMsg('上架成功！');
        }
      });
    });
  }
  /**
   * 下架
   * */
  public inStock(product?) {
    var that = this;
    let productId = product ? [product.productId] : this.selectId;
    that.myAlertService.confirmDialog('确定下架该商品', function (e) {
      that.productService.inStockProduct({productId: productId}).subscribe(res => {
        if(res.success){
          that.myAlertService.successMsg('下架成功！');
        }
      });
    });
  }
  /**
   * 批量操作
   * */
  batch(type){
    let that = this;
    if(this.batchType != type){
      that.myAlertService.confirmDialog('切换批量操作会清除之前的选择，确定切换吗？', function (e) {
        that.batchType = type;
        if(that.batchType == 1 || that.batchType == 2){
          that.batchStatus = 'INSTOCK';
        }else if(that.batchType == 3){
          that.batchStatus = 'ONSALE';
        }
        // 清除之前选中的商品
        that.selectId = [];
      });
    }
  }
  /**
   * 全选当前页
   * */
  checkedAllbox(e){
    this.getBatchproductId();
    // 全选
    if(e.target.checked){
      this.selectId = [...this.selectId, ...this.batchId];
    }else{
      // 取消全选
      this.selectId = this.selectId.filter((item, index) => {
        this.batchId.forEach((id, i) => {
          if(item != id){
            return item;
          }
        });
      });
    }
  }
  /**
   * 点击checkbox
   * */
  checkedbox(product, e){
    console.log(e.target.checked);
    // 点击之前的状态
    // if(this.selectId.indexOf(product.productId) == -1){
    //   // 选中， 添加id
    //   this.selectId.push(product.productId);
    // }else{
    //   // 取消选中, 移除id
    //   this.selectId = this.selectId
    //     .filter(item => {
    //       return item !== product.productId;
    //     })
    // }
    if(e.target.checked){
      // 选中， 添加id
      this.selectId.push(product.productId);
    }else{
      // 取消选中, 移除id
      this.selectId = this.selectId
        .filter(item => {
          return item !== product.productId;
        })
    }
  }
  /**
   * 判断全选是否选中当前页
   * */
  a = 1;
  isCheckedAll(){
    // console.log(this.a++);
    this.getBatchproductId();
    for(let i=0;i<this.batchId.length;i++){
      if(this.selectId.indexOf(this.batchId[i]) == -1){
        console.log('fffffffff');
        return false;
      }
    }
    console.log('tttttttttt');
    return true;
  }


  aaa(){
    console.log('dsdsdsdsx')
  }
  /**
   * 判断checkbox是否选中
   * */
  isChecked(id){
    if(this.selectId.indexOf(id) == -1){
      return false;
    }else{
      return true;
    }
  }
  /**
   *
   * */
  // 获取当前页面符合状态的productId
  getBatchproductId(){
    this.batchId = this.productList.filter(item => {
      return item.status == this.batchStatus;
    }).map(item => {
      return item.productId;
    });
  }
  /**
   * 切换导航状态
   * */
  navChange(nav): void {
    this.nav.current = nav;
    this.bigCurrentPage = 1;
    this.getProducts();
  }
  /**
   * 换页
   * */
  public pageChanged(event:any):void {
    console.log(event)
    this.bigCurrentPage = event.page;
    this.getProducts();
  }
  /**
   * 删除商品
   * */
  deleteProduct(product?){
    let that = this;
    that.myAlertService.confirmDialog('确定删除该商品？', function (e) {
      that.productService.deleteProduct(product.productId).subscribe(res => {
        if(res.success){
          that.myAlertService.successMsg('删除成功！');
        }
      });
    });
  }
  /**
   * 编辑商品分类
   * */
  proCategory = [];
  categoryList = [];
  categoryShowList = [];
  currentProduct = {};
  editProCategory(temp, product){
    let that = this;
    this.currentProduct = product;
    if(this.categoryList.length == 0){
      that.productService.getAllProCategory().subscribe(res => {
        if(res.success){
          console.log('aaa')
          that.categoryList = res.data;
          that.initSelectedData(product);
        }
      });
    }else{
      that.initSelectedData(product);
    }
    this.proCategoryModalRef = this.modalService.show(temp);
  }
  /**
   * 初始化商品分类
   * */
  initSelectedData(product){
    let that = this;
    that.categoryList.forEach(item => {
      if (product['categoryIds'].indexOf(item.categoryId) > -1) {
        item.isSelected = true;
      }else{
        item.isSelected = false;
      }
    });
    that.categoryShowList = that.treeService.changeCategoryList(that.categoryList, 'parentId', 'categoryId', '0');
    console.log(that.categoryShowList)
  }
  /**
   * 保存修改的商品分类
   * */
  changeProCategory(){
    console.log(this.proCategory)
    let that = this;
    let categoryIds = that.proCategory.map(item => {
      return item.categoryId;
    })
    let data = {
      productId: this.currentProduct['productId'],
      categoryIds: categoryIds
    };
    this.productService.setProCategory(data).subscribe(res => {
      if(res.success){
        that.myAlertService.successMsg('设置商品分类成功！');
        that.currentProduct['categoryIds'] = categoryIds;
      }
    });
  }

  /**
   * 获取商品列表
   * */
  getProducts() {
    let that = this;
    let params = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.bigCurrentPage,
    };
    if(this.nav.current.key !== 'ALL'){
      Object.assign(params, {status: this.nav.current.key});
    }
    this.productService.getProductList(params).subscribe(resp => {
      console.log(resp);
      if(resp.success){
        that.productList = resp.data.productList;
        that.bigTotalItems = resp.data.totalItems;
        if(that.batchType != 0){
          that.isCheckedAll();
        }
      }
    });
  }
  ngOnInit() {
    this.getProducts();

    console.log(this.productService.isLoggedIn);
    this.productService.login();
    console.log(this.productService.isLoggedIn);


  }
  ngAfterContentInit(){
    // console.log('555555555555555555555555  ngAfterContentInit');
  }
  ngAfterViewInit() {
    // console.log('666666666666666666666666  ngAfterViewInit');
  }

  ngOnDestroy() {
    // console.log('777777777777777777777777  ngOnDestroy');
  }
  ngAfterContentChecked(){
    // console.log('88888888888888888888888  ngAfterContentChecked');
  }
  ngAfterViewChecked(){
    // console.log('999999999999999999999999  ngAfterViewChecked');
  }
}
