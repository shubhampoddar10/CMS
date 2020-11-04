import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, take, tap } from "rxjs/operators";
import { from, Observable } from "rxjs";
import { LoginService } from "./login/login.service";
import { Injectable } from "@angular/core";
import { config } from "./config"
import { NotificationService } from "./mat-confirm-dialog/notification.service";
import { style } from "@angular/animations";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router,private snackBar: NotificationService) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot
    ):  | boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {
        return this.loginService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user
                if (isAuth && route.data && route.data.roles && route.data.roles.includes(user.userType) ) {
                    return true;
                } else {
                    this.snackBar.redirect("You don't have enough permission to access this page")
                    this.router.navigate(['/data-studio']);
                    
                }
                // return this.router.createUrlTree(['/']);
            }),
            // tap(isAuth => {
            //     if (!isAuth) {
            //         this.router.navigate(['/'])
            //     }
            // })
        );
    }
}