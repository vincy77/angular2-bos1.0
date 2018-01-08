import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "./user.service";
@Injectable()
export class MyLoginService implements CanActivate{

  private result:boolean = false;

  constructor(
    private router:Router,
    private userService:UserService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    console.log('login-service');
    console.log(this.userService.isAuthenticated);
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        console.log('isAuthenticated');
        console.log();
        if (!isAuthenticated) {
          this.router.navigate(["/login"]);
        }
        this.result = isAuthenticated;
      }
    );
    console.log(this.result);
    return this.result;
  }

}
