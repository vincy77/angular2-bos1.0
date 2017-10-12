import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// import {LayoutComponent } from './layout/layout.component';
import {HeaderComponent} from './layout/header/header.component';
import {NavComponent} from './layout/nav/nav.component';

// import { AlertModule } from 'ngx-bootstrap';
// import { PaginationModule } from 'ngx-bootstrap/pagination';
// import { ButtonsModule } from 'ngx-bootstrap';
import { AlertModule, ButtonsModule, PaginationModule,  ModalModule} from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
   // AppRoutingModule
   //  LayoutComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
