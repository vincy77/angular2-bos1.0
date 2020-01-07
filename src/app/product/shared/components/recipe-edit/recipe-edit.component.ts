import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import { MyAlertService } from '../../../../core/my-alert.service';
import { ProductService } from '../../product.service';
import { FileUploader } from 'ng2-file-upload';
const URL = `/api/uploadFile`;
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  @Input() data = {};
  @Output() save = new EventEmitter();

  ingredientsModalRef: BsModalRef;
  recipeData = {};
  recipeList = [];
  cookStep = [];
  search = {}; //搜索
  tempIngredients = []; // 暂存的选中的材料列表(没有点击确认按钮，清除数据)
  ingredients = []; // 确定的选中的材料列表(页面展示和最终提交的数据)
  ingredientIds = [];// 显示操作+或-的按钮
  // product table分页
  itemsPerPage: number = 10;
  bigTotalItems:number = 0;
  bigCurrentPage:number = 1;
  // 材料弹窗数据
  productList = [];
  searchValue = '';
  // 上传插件
  uploader = {};
  options = { // 上传插件配置参数
    url: URL,
    itemAlias: 'file',
    autoUpload: true
  };
  isMultiple = false; // 是否是多张图片
  constructor(
    private productService: ProductService,
    private myAlertService: MyAlertService,
    private modalService: BsModalService,
    private recipeModalRef: BsModalRef
  ) {
    this.uploader['stepImg'] = new FileUploader(this.options);
  }
  /**
   * 保存菜谱
   * */
  recipeSubmit(recipeForm) {
    let that = this;
    let formData = recipeForm.value;

    this.ingredientIds = this.ingredients.map(item => {
      return item.productId;
    });
    Object.assign(formData, {cookStep: this.recipeData['cookStep'], ingredients: this.ingredientIds});
    console.log(formData)
    if(this.recipeData && this.recipeData['recipeId']){
      Object.assign(formData, {recipeId: this.recipeData['recipeId']});
    }
    this.recipeModalRef.hide();
    this.productService.addRecipe(formData).subscribe(resp => {
      if(resp.success){
        that.myAlertService.successMsg('保存成功！');
        that.save.emit(formData);
      }
    });
  }
  /**
   * 选择菜谱所需材料（打开选择商品弹窗）
   * */
  selectIngredients(temp){
    this.getProducts();
    // 获取之前选中的商品
    console.log(this.ingredients)
    this.tempIngredients = [...this.ingredients];
    // 获取之前选中的商品id
    this.ingredientIds = this.ingredients.map(item => {
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
    // this.itemsPerPage = event.itemsPerPage;
    this.bigCurrentPage = event.page;
    this.getProducts();
  }
  /**
   * 模糊搜索商品
   * */
  searchProduct() {
    this.bigCurrentPage = 1;
    this.getProducts();
  }
  /**
   * 添加原材料
   * */
  addIngredient(item){
    //
    this.ingredientIds.push(item.productId);
    this.tempIngredients.push(item);
  }
  /**
   * 移除原材料
   * */
  removeIngredient(item){
    this.ingredientIds = this.ingredientIds.filter(i => {
      return i !== item.productId;
    });
    this.tempIngredients = this.tempIngredients.filter(i => {
      return i.productId !== item.productId;
    });
  }
  /**
   * 确定添加的原材料
   * */
  confirmIngredients() {
    this.ingredients = [...this.tempIngredients];
    this.ingredientsModalRef.hide();
  }
  /**
   * 添加制作步骤
   * */
  addStep(){
    //this.cookStep.push({desc: '', stepImg: ''});
    this.recipeData['cookStep'].push({desc: '', stepImg: ''});

  }
  deleteStep(i, item) {
    this.recipeData['cookStep'].splice(i, 1);
  }

  /**
   * 选择图片后回调
   * */
  selectedFileOnChanged(name, event, i) {
    // 这里是文件选择完成后的操作处理
    this.isMultiple = event.target.multiple;
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
        that.cookStep[i]['stepImg'] = JSON.parse(res).data;
        console.log('success'); // 上传文件成功后获取服务器返回的数据,根据项目需求处理返回来的数据；
      } else {
        console.log('error'); // 上传文件后获取服务器返回的数据错误
      }
    };
    this.uploader[name].onCompleteAll = function () {
      console.log('over');
    }
  }
  ngOnInit() {
    let that = this;
    this.recipeData = {...this.data};
    console.log(this.recipeData)
    if(this.recipeData['ingredients'] && this.recipeData['ingredients'].length > 0) {
      this.ingredientIds = this.recipeData['ingredients'];
      let data = {ingredients : this.recipeData['ingredients']};
      this.productService.getIngredientsDetail(data).subscribe(res => {
        that.ingredients = res.data;
      });
    }
  }

}
