import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import {TradeListComponent} from "./list/list.component";
import {TradeDetailComponent} from './detail/detail.component';
// import {LoginComponent} from "./login/login.component";
//import {LayoutModule} from ''
import {MyLoginService} from "../core/my-login.service";


const tradeRoutes: Routes = [
    {
      path: 'tradeList', component: TradeListComponent ,canActivate:[MyLoginService]
    },
  {
    path: 'tradeDetail', component: TradeDetailComponent ,canActivate:[MyLoginService]
  },
  {
    path: '', component: TradeDetailComponent ,canActivate:[MyLoginService]
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
