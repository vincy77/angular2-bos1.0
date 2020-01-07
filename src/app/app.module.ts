import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
// import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
// import { map, filter, switchMap } from 'rxjs/operators';
import { CoreModule } from './core/core.module';

import { SharedModule } from './shared/shared.module';

// import { CodemirrorModule } from '@ctrl/ngx-codemirror';

// @import "codemirror/lib/codemirror.css";
// @import "~codemirror/theme/material.css";
import { AppComponent } from './app.component';
//import { AppRoutingModule } from './app-routing.module';

// import {HeaderComponent} from './layout/header/header.component';
// import {NavComponent} from './layout/nav/nav.component';


import { MyAlertComponent } from './core/my-alert/my-alert.component';

@NgModule({
  declarations: [
    AppComponent,
   //  HeaderComponent,
   //  NavComponent,
    MyAlertComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    // CodemirrorModule
    //AppRoutingModule
  ],
  exports: [
    SharedModule
  ],
  providers: [

  ],
  entryComponents: [
    MyAlertComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
