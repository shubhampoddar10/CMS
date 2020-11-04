import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';

interface AuthResponseData {
  token: string;
  // email: string;
  // expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string;
  user = new BehaviorSubject<User>(null);
  private userType: string;
  // private tokenExpirationTimer: any;

  constructor(private http$: HttpClient, private router: Router) { }

  public login(email: string, password: string): Observable<any> {
    return this.http$.post<AuthResponseData>('http://cargohungry.com/users/login',
      {
        email: email,
        password: password
      }).pipe(tap(resData => {
        this.handleAuthentication(
          resData,
          // resData.email,
          // resData.localId,
          // +resData.expiresIn
        );
        this.token = resData.token,
        this.userType = resData.userType
      }) 
      );
  }

  public autoLogin() {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    // const userData: {
      // _token: localStorage.getItem('token'); 
      // email: string;
      // userId: string; 
      // _tokenExpirationDate: string;
    // };
    if(!token && !userType) {
      return;
    }

    const loadedUser = new User(
      token,
      userType
      // userData.email,
      // userData.userId,
      // new Date(userData._tokenExpirationDate)
      );

      if(loadedUser.token && loadedUser.userType){
        this.user.next(loadedUser);
        // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - 
        // new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
  }

  public getToken() {
    return this.token
  } 


  public logout() {
    this.user.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    // if(this.tokenExpirationTimer) {
    //   clearTimeout(this.tokenExpirationTimer);
    //   this.tokenExpirationTimer = null;
    // }
  }

  // public autoLogout(expirationDuration: number) {
  //   console.log(expirationDuration);
    
  //   this.tokenExpirationTimer = setTimeout(()=>{
  //     this.logout();
  //   },20000);
  // }

  public statusLogout(err: HttpErrorResponse) {
    if(err.error instanceof Error) {
      if(err.status == 401 ) {
        this.logout();
      }
    }
  }


  private handleAuthentication( userData: any) {
    // console.log(expiresIn);
    
    // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(userData.token,userData.userType);
    this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    localStorage.setItem('token',userData.token);
    localStorage.setItem('userType',userData.userType);
  }

};
