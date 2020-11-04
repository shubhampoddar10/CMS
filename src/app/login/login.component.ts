import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // @ViewChild('#form') signIn: NgForm;
  private result: any;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.loginService.login(email, password).subscribe(
      (resData) => {
        console.log(resData);
        this.result = resData;
        
        this.router.navigate(['/data-studio']);
      },
      (errRes: HttpErrorResponse) => {
        alert('Some Error Occured');
        if (errRes.error instanceof Error) {
          console.log('Client Side Error');
        } else {
          console.log('Server Side Error', errRes);
        }
      }
    ); 
  }

  // onSubmit(userData: any) {
  //   let userDataForLogin = {email: userData.value.username, password: userData.value.password};
  //   this.service$.getUserData(userDataForLogin).subscribe(
  //     (posRes) => {
  //       this.result = posRes;
  //       this.router.navigate(['/dashboard'])
  //     }, (errRes: HttpErrorResponse) => {
  //       alert("Some Error Occured")
  //       if (errRes.error instanceof Error) {
  //         console.log('Client Side Error');
  //       } else {
  //         console.log('Server Side Error',errRes);

  //       }
  //     }
  //   )
  // };
}
