import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
    HttpModule,
    ButtonsModule,
    PaginationModule,
    ModalModule,
    BsDropdownModule,
    AlertModule,
    SelectModule,
    pipe
  ],
  declarations: [
    pipe
  ]
})
export class SharedModule { }
