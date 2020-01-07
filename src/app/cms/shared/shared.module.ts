import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { CMSBannerComponent } from './banner/banner.component';

import { CMSService } from './cms.service';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    CMSBannerComponent,
    SharedModule
  ],
  providers: [
    CMSService
  ],
  declarations: [
    CMSBannerComponent
  ],
  entryComponents: [
    // CMSBannerComponent
]
})
export class CMSSharedModule { }
