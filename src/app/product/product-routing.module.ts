import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import {ProductAddComponent} from "./add/add.component";
import { ProductListComponent } from "./list/list.component";


const productRoutes: Routes = [
    {
      path: 'productAdd', component: ProductAddComponent //,canActivate:[NeedAuthGuard]
    },
    {
      path: 'productList', component: ProductListComponent //,canActivate:[NeedAuthGuard]
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
