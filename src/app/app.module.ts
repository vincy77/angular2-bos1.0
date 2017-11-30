import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';


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
