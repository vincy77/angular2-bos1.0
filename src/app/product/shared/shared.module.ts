import { NgModule } from '@angular/core';
// import { ConfirmDialogComponent } from '../../core/confirm-dialog/confirm-dialog.component';

import { ProductService } from '../shared/product.service';

@NgModule({
  imports: [
  ],
  exports: [
  ],
  providers: [
    ProductService
  ],
  declarations: [
    // ConfirmDialogComponent
  ],
  entryComponents: [
    // ConfirmDialogComponent
]
})
export class productSharedModule { }
