import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import {CMSIndexComponent} from "./index/index.component";
import {CMSListComponent} from "./list/list.component";


const productRoutes: Routes = [
    {
      path: 'cmsIndex', component: CMSIndexComponent //,canActivate:[NeedAuthGuard]
    },
    {
      path: 'cmsList', component: CMSListComponent //,canActivate:[NeedAuthGuard]
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
