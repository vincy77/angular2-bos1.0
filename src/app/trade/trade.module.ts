import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { ButtonsModule, PaginationModule,  ModalModule} from 'ngx-bootstrap';
// import { PaginationModule } from 'ngx-bootstrap/pagination';
// import { ModalModule } from 'ngx-bootstrap/modal';



import { TradeListComponent } from './list/list.component';
import { TradeDetailComponent } from './detail/detail.component';
import { TradeRoutingModule } from './trade-routing.module';

import { TradeService } from './trade.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    //导入InMemoryWebApiModule并将其加入到模块的imports数组。 I
    // nMemoryWebApiModule将Http客户端默认的后端服务 — 这是一个辅助服务，
    // 负责与远程服务器对话 — 替换成了内存 Web API服务：
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    TradeRoutingModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    TradeListComponent,
    TradeDetailComponent
  ],
  providers: [
    TradeService
  ]
})
export class TradeModule { }
