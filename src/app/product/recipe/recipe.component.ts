import { Component, OnInit, ElementRef } from '@angular/core';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import { MyAlertService } from '../../core/my-alert.service';
import { UploadFileService } from '../../core/service/upload-file.service';
import { ProductService } from '../shared/product.service';

import { RecipeEditComponent } from '../shared/components/recipe-edit/recipe-edit.component';
import {initialState} from "ngx-bootstrap/timepicker/reducer/timepicker.reducer";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  public recipeModalRef: BsModalRef;

  //recipeData = {};
  recipeList = [];
  search = {}; //搜索

  itemsPerPage: number = 10;
  totalItems: number = 0;
  page: number = 1;
  maxSize:number = 5;

  constructor(
    private productService: ProductService,
    private myAlertService: MyAlertService,
    private modalService: BsModalService,
    private uploadFileService: UploadFileService
  ) {}

  /**
   * 打开创建菜谱弹窗
   * */
  createRecipe() {
    let that = this;
    this.recipeModalRef = this.modalService.show(RecipeEditComponent);
    this.recipeModalRef.content.save.subscribe(res => {
      that.getRecipeList();
    });
  }
  /**
   * 编辑菜谱
   * */
  editRecipe(item) {
    const initialState = {
      data: item
    };
    this.recipeModalRef = this.modalService.show(RecipeEditComponent, {initialState});
    this.recipeModalRef.content.save.subscribe(res => {
      item = res;
    });
  }
  /**
   * 列表换页
   * */
  recipePageChanged(event) {
    this.page = event.page;
    this.getRecipeList();
  }
  /**
   * 获取菜谱列表
   * */
  getRecipeList() {
    let that = this;
    let params = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.page,
    };
    // if(this.searchValue){
    //   Object.assign(params, {title: this.searchValue});
    // }
    this.productService.getRecipeList(params).subscribe(resp => {
      if(resp.success){
        that.recipeList = resp.data.recipeList;
        that.totalItems = resp.data.totalItems;
      }
    });
  }
  ngOnInit() {
    this.getRecipeList();
  }

}
