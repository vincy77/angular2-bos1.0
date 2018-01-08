import { Component, OnInit } from '@angular/core';
import {UserService} from "../../core/user.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService:UserService,
    private router:Router
  ){}

  logout(){
    this.userService.clearAuth();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }
}

