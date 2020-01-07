import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
// import { FileUploadModule } from 'ng2-file-upload';
/**
 * 自定义指令
 * */
import { TestDirective } from './directive/test.directive';
import { ShowAuthedDirective } from './directive/show-authed.directive';
/**
 * 第三方组件
 * */
import { ButtonsModule, PaginationModule,  ModalModule, BsDropdownModule, AlertModule, SortableModule} from 'ngx-bootstrap';
// import { AngularDraggableModule } from 'angular2-draggable';

// import { SelectModule } from 'ng2-select';
/**
 * 自定义管道（管道生效必须放到declarations里面）
 * */
import { productCategoryPipe } from './pipe/product-category.pipe';
/**
 * 自定义组件
 * */
import { MultipleSelectModule } from './components/multiple-select/multiple-select.module';
// import { MutipleTreeComponent } from './components/multiple-select/mutiple-tree.component';
// import { MutipleSelectComponent } from './components/multiple-select/multiple-select.component';


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
    AlertModule.forRoot(),
    SortableModule.forRoot(),
    // AngularDraggableModule,
    MultipleSelectModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // FileUploadModule,
    ButtonsModule,
    PaginationModule,
    ModalModule,
    BsDropdownModule,
    AlertModule,
    SortableModule,
    // SelectModule,
    pipe,
    TestDirective,
    ShowAuthedDirective,
    // AngularDraggableModule,
    MultipleSelectModule
    // MutipleTreeComponent,
    // MutipleSelectComponent
  ],
  declarations: [
    pipe,
    TestDirective,
    ShowAuthedDirective,
    // MutipleTreeComponent,
    // MutipleSelectComponent
  ]
})
export class SharedModule { }
