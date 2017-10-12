import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { UserListComponent } from './add/add.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    //UserListComponent
  ]
})
export class UserModule { }
