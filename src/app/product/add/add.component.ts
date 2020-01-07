import { Component, OnInit,  AfterViewInit,AfterContentChecked, AfterViewChecked, AfterContentInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import { Product } from '../shared/product';
import { MyAlertService } from '../../core/my-alert.service';
import { TreeService } from '../../core/service/tree.service';
import { ProductService } from '../shared/product.service';

import { FileUploader } from 'ng2-file-upload';
const URL = `/api/uploadFile`;
declare var Sortable:any;
@Component({
  selector: 'product-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.scss']
})
export class ProductAddComponent implements OnInit, AfterViewInit {
  // 原始分类列表
  categoryList = [];
  // 处理成tree结构的分类列表
  categoryShowList = [];
  // 多图片预览链接()
  multipleSetectedImgUrl = [];
  // 单图片预览链接（本页面暂没有单图片属性）
  singleSetectedImgUrl;
  // 上传插件
  uploader = {};
  // 上传插件配置参数
  options = {
    url: URL,
    itemAlias: 'file',
    autoUpload:true
  };
  // 是否是多张图片
  isMultiple = false;
  //除了使用了变量赋值的方式初始化组件，还可以使用构造函数constructor()来声明和初始化属性
  // productData = new Product('', '', '', '', '', [], null);
  productData = {};
  categoryTitle = '商品分类';
  submitted = false;
  isEdit = false;
  name = 'categoryName'
  recipeData = {};
  step = [];
  // 暂存的选中的材料列表(没有点击确认按钮，清除数据)
  ingredients = [];
  // 确定的选中的材料列表(页面展示和最终提交的数据)
  ingredientList = [];
  // 显示操作+或-的按钮
  ingredientIds = [];
  //
  public itemsPerPage: number = 10;
  public bigTotalItems:number = 0;
  public bigCurrentPage:number = 1;
  productList = [];
  searchValue = '';
  public recipeModalRef: BsModalRef;
  public ingredientsModalRef: BsModalRef;

  constructor(
    private productService: ProductService,
    private myAlertService: MyAlertService,
    private treeService: TreeService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.uploader['bannerImg'] = new FileUploader(this.options);
    this.uploader['detailImg'] = new FileUploader(this.options);
    this.uploader['stepImg'] = new FileUploader(this.options);

  }
  aaa(even){
    console.log(even)
    console.log(this.categoryShowList)

  }
  // uploadImg() {
  //   console.log('uploadImg')
  //   let formData = new FormData();
  //   let base64 = ''
  //
  //   formData.append('fileCode', this.base64ToBlob('data:image/png;base64,' + base64));
  //   formData.append('fileName', 'aaaaaa');
  //   console.log(formData)
  //
  //   this.productService.uploadFile(formData).subscribe(resp => {
  //     if(resp.success){
  //
  //     }
  //   });
  // }
  // base64ToBlob(str) {
  //   let arr = str.split(',');
  //   let _arr = arr[1].substring(0, arr[1].length - 2);
  //   let mime = arr[0].match(/(.*?);/)[1];
  //   let bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   let u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //
  //   return new Blob([u8arr], {
  //     type: mime
  //   })
  // }






  /**
   * 选择图片后回调
   * */
  selectedFileOnChanged(i, event, name) {
    // 这里是文件选择完成后的操作处理
    let that = this;
    console.log(name)
    console.log(i)
    console.log()
    that.isMultiple = event.target.multiple;
    // 选中后直接上传，上传成功有返回图片链接，可直接展示图片，不需要前端转换图片实现预览
    // 多张图片
    if(that.isMultiple){
      // that.uploader[name].queue.forEach((q, i) => {
      //   if(that.multipleSetectedImgUrl.length == 0 || i >= that.multipleSetectedImgUrl.length){
      //     let reader = new FileReader();
      //     reader.readAsDataURL(q.some);//生成base64图片地址，实现本地预览。只是same属性被protected修饰，需要修改为public。
      //     reader.onload = function () {
      //       that.multipleSetectedImgUrl.push(this.result);
      //     }
      //   }
      // });
    }else{
      // 单张图片
      // let reader: FileReader = new FileReader();
      // let q = that.uploader[name].queue[that.uploader[name].queue.length - 1];
      // reader.readAsDataURL(q.some);
      // reader.onload = function () {
      //   that.singleSetectedImgUrl = this.result;
      // }
    }
    this.uploadImgCallback(name, i);
  }
  /**
   * 图片上传回调
   * */
  uploadImgCallback(name, i){
    let that = this;
    // this.uploader[name].uploadAll();
    this.uploader[name].onSuccessItem = (item, res, status, headers) => {
      // 单张图片上传文件成功，上传多张图片的话会执行多次
      if (status == 200) {
        if(that.isMultiple){
          // 上传成功后把返回的图片链接添加道商品信息中
          that.productData[name] = that.productData[name] ? that.productData[name] : [];
          that.productData[name].push(JSON.parse(res).data);
        }else{
          if(name == 'stepImg') {
            that.step[i]['stepImg'] = JSON.parse(res).data;
          }else{
            that.productData[name] = JSON.parse(res).data;
          }
        }
        console.log(that.uploader[name].queue);
        console.log('success'); // 上传文件成功后获取服务器返回的数据,根据项目需求处理返回来的数据；
      } else {
        console.log('error'); // 上传文件后获取服务器返回的数据错误
      }
    };
    this.uploader[name].onCompleteAll = function () {
      console.log('over');
      console.log(that.productData);
    }
  }
  deleteImg(name, index) {
    this.productData[name].splice(index, 1);
  }
  /**
   * 提交表单
   * */
  onSubmit(productForm) {
    let that = this, categoryIds;
    this.myAlertService.confirmDialog('确认提交吗？', function (e) {
      that.submitted = true;
      console.log(productForm.value);
      console.log(that.productData);
      let formData = productForm.value;
      // 分类id
      if(that.productData['categoryIds']) {
        categoryIds = that.productData['categoryIds'].map(item => {
          return item.categoryId;
        });
      }

      //处理组件控件数据
      Object.assign(formData, {productImg: that.productData['productImg'],categoryIds: categoryIds});
      // 是否是编辑
      if(that.productData['productId']){
        Object.assign(formData, {productId: that.productData['productId']});
      }
      console.log(formData);
      //name = name.trim();
      // if(!name) {return}
      that.productService.addProduct(formData)
        .subscribe(res => {
          if(res.success){
            if(!that.productData['productId']){
              that.productData = res.data;
              that.myAlertService.successMsg('商品保存成功！');
            }else{
              that.myAlertService.successMsg('商品修改成功！');
            }
            // that.activatedRoute.snapshot.paramMap.get('productId') = res.data.productId;

          }
        });
    });
  }
  goBack(){
    this.router.navigate(['/product/productList']);
  }
  /**
   * 获取分类
   * */
  testdata=[];
  getProCategory(productId){
    let that = this;
    that.productService.getAllProCategory().subscribe(res => {
      if(res.success){
        that.categoryList = res.data;
        // 分类数据处理成tree结构(编辑页面，在获取编辑页面数据之后，把是否有选中的分类属性添加之后再处理成tree)
        if(!productId){
          that.categoryShowList = that.treeService.changeCategoryList(that.categoryList, 'parentId', 'categoryId', '0');
          console.log(that.categoryShowList)
        }
      }
    });
  }
  /**
   * 选中分类后的操作
   * */
  selectCategory(template,last,sub?,item?){
    console.log(template);
    if(last.children.length <= 0){
      this.productData['categoryId'] = last['categoryId'];
      this.categoryTitle = item ? `{item['categoryName']}>${sub['categoryName']}>${last['categoryName']}`
        : (sub ? `${sub['categoryName']}>${last['categoryName']}` : `${last['categoryName']}`);
      // template.hide();
    }
  }
  /**
   * 获取编辑的商品信息
  * */
  getProductData(productId){
    let that = this;
    this.productService.getProData(productId).subscribe(res => {
      if(res.success){
        that.productData = res.data;
        // that.multipleSetectedImgUrl = res.data.productImg;
        that.categoryTitle = res.data.categoryName;
        if(that.productData['categoryIds'].length > 0) {
          that.categoryList.forEach(item => {
            if (that.productData['categoryIds'].indexOf(item.categoryId) > -1) {
              console.log(item.categoryId)
              item.isSelected = true;
            }
          });
        }
        that.categoryShowList = that.treeService.changeCategoryList(that.categoryList, 'parentId', 'categoryId', '0');
      }
    })
  }
  /**
   * 打开创建菜谱弹窗
   * */
  createRecipe(temp) {
    this.recipeModalRef = this.modalService.show(temp);
  }
  /**
   * 选择菜谱所需材料（打开选择商品弹窗）
   * */
  selectIngredients(temp){
    this.getProducts();
    // 获取之前选中的商品
    this.ingredients = [...this.ingredientList];
    // 获取之前选中的商品id
    this.ingredientIds = this.ingredientList.map(item => {
      return item.productId;
    });

    this.ingredientsModalRef = this.modalService.show(temp);
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
    if(this.searchValue){
      Object.assign(params, {title: this.searchValue});
    }
    this.productService.getProductList(params).subscribe(resp => {
      if(resp.success){
        that.productList = resp.data.productList;
        that.bigTotalItems = resp.data.totalItems;
      }
    });
  }
  /**
   * 材料商品列表换页
   * */
  pageChanged(event:any):void {
    this.itemsPerPage = event.itemsPerPage;
    this.bigCurrentPage = event.page;
    this.getProducts();
  }
  /**
   * 模糊搜索商品
   * */
  searchProduct(event) {
    this.itemsPerPage = event.itemsPerPage;
    this.bigCurrentPage = event.page;
    this.getProducts();
  }
  /**
   * 添加原材料
   * */
  addIngredient(item){
    //
    this.ingredientIds.push(item.productId);
    this.ingredients.push(item);
  }
  /**
   * 移除原材料
   * */
  removeIngredient(item){
    this.ingredientIds = this.ingredientIds.filter(i => {
      return i !== item.productId;
    });
    this.ingredients = this.ingredients.filter(i => {
      return i.productId !== item.productId;
    });
  }
  /**
   * 确定添加的原材料
   * */
  confirmIngredients() {
    this.ingredientList = [...this.ingredients];
    this.ingredientsModalRef.hide();
  }
  /**
   * 添加制作步骤
   * */
  addStep(){
    this.step.push({desc: '', stepImg: ''})
    // this.uploader['img'] = new FileUploader(this.options);
    // this.uploader['img' + (this.step.length - 1)] = new FileUploader(this.options);

  }
  /**
   * 保存菜谱
   * */
  recipeSubmit(recipeForm) {
    let that = this;
    let formData = recipeForm.value;

    console.log(this.step)
    console.log(this.ingredientList)
    this.ingredientIds = this.ingredientList.map(item => {
      return item.productId;
    });
    Object.assign(formData, {step: this.step, ingredientIds: this.ingredientIds});
    console.log(formData)
    this.recipeModalRef.hide();

  }
  ngOnInit() {
    console.log(this.productService.isLoggedIn);
    this.productService.login();

    // 获取商品id，判断是新增还是编辑
    console.log(this.activatedRoute);
    let productId = this.activatedRoute.snapshot.queryParams['productId'];
    // 获取分类数据
    this.getProCategory(productId);
    // 获取编辑商品数据
    console.log(productId);
    if(productId){
      this.getProductData(productId);
      // this.isEdit = true;
    }
  }
  /**
   * 拖拽图片重新排序后，更新图片列表顺序
   * */
  ngAfterViewInit(){
    // console.log('666666666666666666666666  ngAfterViewInit');

    let that = this;
    var el = document.getElementById('productImages');
    Sortable.create(el,{
      onStart: function (/**Event*/evt) {},
      onEnd: function(evt){
        let list = that.productData['productImg']; //that.multipleSetectedImgUrl;
        list.splice(evt.oldIndex, 1, ...list.splice(evt.newIndex, 1, list[evt.oldIndex]));
        console.log(that.productData['productImg']);
      }
    });
  }
  ngAfterContentInit(){
    // console.log('555555555555555555555555  ngAfterContentInit');
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
