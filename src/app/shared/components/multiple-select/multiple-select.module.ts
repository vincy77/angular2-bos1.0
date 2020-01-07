import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDropdownModule} from 'ngx-bootstrap';
import { MultipleSelectService } from './multiple-select.service';
import { MultipleTreeComponent } from './multiple-tree.component';
import { TestComponent } from './test.component';
import { MultipleSelectComponent } from './multiple-select.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    MultipleSelectService
  ],
  exports: [
    MultipleTreeComponent,
    TestComponent,
    MultipleSelectComponent
  ],
  declarations: [
    MultipleTreeComponent,
    TestComponent,
    MultipleSelectComponent
  ]
})
export class MultipleSelectModule { }
