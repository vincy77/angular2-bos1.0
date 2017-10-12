import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import {NotFoundComponent} from "./not-found/not-found.component";
// import {LoginComponent} from "./login/login.component";
// import {NeedAuthGuard} from "./login/no-auth-guard.service";


const appRoutes: Routes = [
    {
      path: '',
      redirectTo: '/notfound',
      pathMatch: 'full'
    },
    {
        path:'trade',loadChildren:'./trade/trade.module#TradeModule'
    },
    {
        path:'user',loadChildren:'./user/user.module#UserModule'
    },
  {
    path:'product',loadChildren:'./product/product.module#ProductModule'
  },
    // {
    //     path:'login',component:LoginComponent
    // },
    //angular2 官网的404路由配置有错，通过下面2行修正
    // {
    //     path:'nofound',loadChildren:'./nofound/nofound.module#NoFoundModule'
    // },
    {
      path: 'notfound', component: NotFoundComponent //,canActivate:[NeedAuthGuard]
    },
    {
        path:'**',redirectTo:'/notfound'
    }
    // 方法一：
    // { path: 'herolist', loadChildren: () => new Promise(resolve => {
    //     (require as any).ensure([], (require: any) => {
    //         resolve(require('./herolist/herolist.module').HerolistModule);
    //     })
    // })
];


@NgModule({
    declarations: [
      NotFoundComponent
    ],
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}
