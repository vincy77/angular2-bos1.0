import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import {UserListComponent} from "./list/list.component";
//import {LoginComponent} from "./login/login.component";
import {MyLoginService} from "../core/my-login.service";



const userRoutes: Routes = [
    {
      path: 'userList', component: UserListComponent ,canActivate:[MyLoginService]
    },
    {
      path: '', component: UserListComponent ,canActivate:[MyLoginService]
    }
];


@NgModule({
    imports:[RouterModule.forChild(userRoutes)],
    declarations: [
      UserListComponent
    ],
    exports:[RouterModule]
})

export class UserRoutingModule{

}
