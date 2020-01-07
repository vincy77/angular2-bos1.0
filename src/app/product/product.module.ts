import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// import { productSharedModule } from './shared/shared.module';
import { FileUploadModule } from 'ng2-file-upload';
import { SortablejsModule } from 'angular-sortablejs';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';
import { ProductService } from './shared/product.service';


import { ProductAddComponent } from './add/add.component';
import { ProductListComponent } from './list/list.component';
import { ProductRoutingModule } from './product-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductDetailComponent } from './detail/detail.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './shared/components/recipe-edit/recipe-edit.component';


@NgModule({
  imports: [
    //导入InMemoryWebApiModule并将其加入到模块的imports数组。 I
    // nMemoryWebApiModule将Http客户端默认的后端服务 — 这是一个辅助服务，
    // 负责与远程服务器对话 — 替换成了内存 Web API服务：
    // InMemoryWebApiModule.forRoo,
    //
    SharedModule,
    // productSharedModule,
    ProductRoutingModule,
    FileUploadModule,
    SortablejsModule
  ],
  declarations: [
    ProductAddComponent,
    ProductListComponent,
    CategoryComponent,
    ProductDetailComponent,
    RecipeComponent,
    RecipeDetailComponent,
    RecipeEditComponent
  ],
  providers: [
    ProductService
  ],
  entryComponents: [
    RecipeEditComponent
  ]
})
export class ProductModule { }
