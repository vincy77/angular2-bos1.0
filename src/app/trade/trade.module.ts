import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { tradeSharedModule } from './shared/shared.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';


import { TradeListComponent } from './list/list.component';
import { TradeDetailComponent } from './detail/detail.component';
import { TradeRoutingModule } from './trade-routing.module';


@NgModule({
  imports: [
    SharedModule,
    tradeSharedModule,
    //导入InMemoryWebApiModule并将其加入到模块的imports数组。 I
    // nMemoryWebApiModule将Http客户端默认的后端服务 — 这是一个辅助服务，
    // 负责与远程服务器对话 — 替换成了内存 Web API服务：
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    TradeRoutingModule
  ],
  declarations: [
    TradeListComponent,
    TradeDetailComponent
  ],
  providers: [
  ],
  exports: [
  ]
})
export class TradeModule { }
