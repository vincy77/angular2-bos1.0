import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import {TradeListComponent} from "./list/list.component";
import {TradeDetailComponent} from './detail/detail.component';
// import {LoginComponent} from "./login/login.component";
//import {LayoutModule} from ''


const tradeRoutes: Routes = [
    {
      path: 'tradeList', component: TradeListComponent //,canActivate:[NeedAuthGuard]
    },
  {
    path: 'tradeDetail', component: TradeDetailComponent //,canActivate:[NeedAuthGuard]
  },
  {
    path: '', component: TradeDetailComponent //,canActivate:[NeedAuthGuard]
  }
];


@NgModule({
  imports:[
    RouterModule.forChild(tradeRoutes)
  ],
  exports:[
    RouterModule
  ]
})

export class TradeRoutingModule{

}
