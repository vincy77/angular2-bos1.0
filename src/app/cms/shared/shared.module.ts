import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { CMSBannerComponent } from './banner/banner.component';

import { ProductService } from '../shared/product.service';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    CMSBannerComponent,
    SharedModule
  ],
  providers: [
    ProductService
  ],
  declarations: [
    CMSBannerComponent
  ],
  entryComponents: [
    // CMSBannerComponent
]
})
export class CMSSharedModule { }
