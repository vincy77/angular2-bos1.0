import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { ProductAddComponent } from "./add/add.component";
import { ProductListComponent } from "./list/list.component";
import { ProductDetailComponent } from './detail/detail.component';
import { CategoryComponent } from './category/category.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';


const productRoutes: Routes = [
    {
      path: 'productAdd', component: ProductAddComponent //,canActivate:[NeedAuthGuard]
    },
    {
      path: 'productEdit', component: ProductAddComponent //,canActivate:[NeedAuthGuard]
    },
    {
      path: 'productList', component: ProductListComponent //,canActivate:[NeedAuthGuard]
    },
    {
      path: 'productDetail/:productId', component: ProductDetailComponent //,canActivate:[NeedAuthGuard]
    },
    {
      path: 'category', component: CategoryComponent //,canActivate:[NeedAuthGuard]
    },
    {
      path: 'recipe', component: RecipeComponent
    },
    {
      path: 'recipeDetal/:recipeId', component: RecipeDetailComponent
    },
    {
      path: '', component: ProductAddComponent //,canActivate:[NeedAuthGuard]
    }
];


@NgModule({
    imports:[RouterModule.forChild(productRoutes)],
    exports:[RouterModule]
})

export class ProductRoutingModule{

}
