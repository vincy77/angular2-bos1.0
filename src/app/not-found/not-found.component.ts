import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../core/user.service";
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor(
    private router:Router,
    private userService:UserService
  ) { }
  logout(){
    this.userService.clearAuth();
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
  }

}
