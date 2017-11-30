import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { userSharedModule } from './shared/shared.module';

//import { UserListComponent } from './add/add.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    SharedModule,
    userSharedModule,
    UserRoutingModule
  ],
  declarations: [
    //UserListComponent
  ]
})
export class UserModule { }
