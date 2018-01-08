import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import {CMSIndexComponent} from "./index/index.component";


const productRoutes: Routes = [
    {
      path: 'cmsIndex', component: CMSIndexComponent //,canActivate:[NeedAuthGuard]
    },
    {
      path: '', component: CMSIndexComponent //,canActivate:[NeedAuthGuard]
    }
];


@NgModule({
    imports:[RouterModule.forChild(productRoutes)],
    exports:[RouterModule]
})

export class CMSRoutingModule{

}
