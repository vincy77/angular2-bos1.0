import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import {UserListComponent} from "./list/list.component";
//import {LoginComponent} from "./login/login.component";


const userRoutes: Routes = [
    {
      path: 'userList', component: UserListComponent //,canActivate:[NeedAuthGuard]
    },
    {
      path: '', component: UserListComponent //,canActivate:[NeedAuthGuard]
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
