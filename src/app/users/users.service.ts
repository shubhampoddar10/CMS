import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http$: HttpClient) { }

  public getUserDetail() {
    return this.http$.get('http://localhost:13000/users/self')
  }
}

