import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.loginService.getToken()
        const authReq = req.clone({
            headers: req.headers.set('token', authToken)
        })
        return next.handle(authReq)
    }   
}