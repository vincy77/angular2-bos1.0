import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import { Location } from '@angular/common';
import { ProductService } from '../shared/product.service';
import { RecipeEditComponent } from '../shared/components/recipe-edit/recipe-edit.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  public recipeModalRef: BsModalRef;
  recipeData = {};
  product = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private productService: ProductService,
    private modalService: BsModalService,
  ) { }
  /**
   * 获取菜谱信息
   * */
  getRecipeData(recipeId){
    let that = this;
    this.productService.getRecipeData(recipeId).subscribe(res => {
      if(res.success){
        console.log(res);
        that.recipeData = res.data.recipe;
        that.product = res.data.ingredientList;
        // that.multipleSetectedImgUrl = res.data.productImg;
        // that.categoryTitle = res.data.categoryName;
      }
    })
  }
  /**
   * 编辑菜谱
   * */
  editRecipe() {
    const initialState = {
      data: this.recipeData
    };
    this.recipeModalRef = this.modalService.show(RecipeEditComponent, {initialState});
    this.recipeModalRef.content.save.subscribe(res => {
      this.recipeData = res;
    });
  }
  ngOnInit() {
    let recipeId = this.activatedRoute.snapshot.paramMap.get('recipeId');
    this.getRecipeData(recipeId);

  }

}
