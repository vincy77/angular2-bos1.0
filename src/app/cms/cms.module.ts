import { NgModule } from '@angular/core';
// import { SharedModule } from '../shared/shared.module';
import { CMSSharedModule } from './shared/shared.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';



import { CMSIndexComponent } from './index/index.component';
import { CMSRoutingModule } from './cms-routing.module';

@NgModule({
  imports: [
    // SharedModule,
    CMSSharedModule,
    //导入InMemoryWebApiModule并将其加入到模块的imports数组。 I
    // nMemoryWebApiModule将Http客户端默认的后端服务 — 这是一个辅助服务，
    // 负责与远程服务器对话 — 替换成了内存 Web API服务：
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    CMSRoutingModule
  ],
  declarations: [
    CMSIndexComponent
  ]
})
export class CMSModule { }
