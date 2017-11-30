import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { RouterModule } from '@angular/router';

import { AppRoutingModule } from '../app-routing.module';
// 全局的单例服务
import { MyAlertService } from './my-alert.service';

//只加载一次的组件
import {HeaderComponent} from '../layout/header/header.component';
import {NavComponent} from '../layout/nav/nav.component';


@NgModule({
  imports: [
    CommonModule,
   // RouterModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    AppRoutingModule
  ],
  providers: [
    MyAlertService
  ],
  declarations: [
    HeaderComponent,
    NavComponent
  ]
})
export class CoreModule { }
