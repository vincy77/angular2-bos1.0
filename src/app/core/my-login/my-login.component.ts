import { Component, OnInit } from '@angular/core';
import {FormBuilder, Form, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { MyAlertService } from '../my-alert.service';
import {UserService} from "../user.service";
import {User} from "../user.model";
@Component({
  selector: 'my-login',
  templateUrl: 'my-login.component.html',
  styleUrls: ['my-login.component.scss']
})
export class MyLoginComponent {
  model:any = {username:'',password:''};
  error:string;

  constructor(
    private router:Router,
    private userService:UserService,
    private myAlertService: MyAlertService
  ){

  }

  login(){
      console.log(this.model);
    let result = this.userService.getAuth(this.model as User);
    if(result){
      this.router.navigate(['/notfound']);
    }
    else {
      this.myAlertService.errorMsg('账号或密码错误');
      this.error = '账号linweiwei，密码123';
    }
  }
}
