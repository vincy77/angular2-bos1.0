import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//自定义指令
import { TestDirective } from './directive/test.directive';
import { ShowAuthedDirective } from './directive/show-authed.directive';


//bootstrap相关组件
import { ButtonsModule, PaginationModule,  ModalModule, BsDropdownModule, AlertModule} from 'ngx-bootstrap';

import { SelectModule } from 'ng2-select';

// 自定义管道
// 管道生效必须放到declarations里面
import { productCategoryPipe } from './pipe/product-category.pipe';

const pipe = [
  productCategoryPipe
];

@NgModule({
  imports: [
    CommonModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ButtonsModule,
    PaginationModule,
    ModalModule,
    BsDropdownModule,
    AlertModule,
    SelectModule,
    pipe,
    TestDirective,
    ShowAuthedDirective
  ],
  declarations: [
    pipe,
    TestDirective,
    ShowAuthedDirective
  ]
})
export class SharedModule { }
