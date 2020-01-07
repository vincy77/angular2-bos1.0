import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import { RouterModule } from '@angular/router';

import { AppRoutingModule } from '../app-routing.module';
// 全局的单例服务
import { MyAlertService } from './my-alert.service';
import { MyLoginService } from './my-login.service';
import { UserService } from './user.service';
import { TreeService } from './service/tree.service';
import { UploadFileService } from './service/upload-file.service';

//只加载一次的组件
import {HeaderComponent} from '../layout/header/header.component';
import {NavComponent} from '../layout/nav/nav.component';
import {MyLoginComponent} from './my-login/my-login.component';
import {JwtService} from './jwt.service';


@NgModule({
  imports: [
    CommonModule,
   // RouterModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    MyLoginComponent,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    MyAlertService,
    MyLoginService,
    UserService,
    JwtService,
    TreeService,
    UploadFileService
  ],
  declarations: [
    HeaderComponent,
    NavComponent,
    MyLoginComponent
  ]
})
export class CoreModule { }
