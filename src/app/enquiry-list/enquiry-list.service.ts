import { Headers , Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnquiryListService {
  edit = new Subject<void>();
  header = new Headers({ token: localStorage.getItem('token') });
  constructor(private http$: Http) {}

  public getList(): Observable<any> {
    console.log(localStorage.getItem('token'));

    // this.header.append('token',localStorage.getItem('token'));
    return this.http$.get('http://localhost:13000/inquiery/request', {
      headers: this.header,
    });
  }

  public deleteEmployee(id: any): Observable<any> {
    console.log('calling delete api');
    return this.http$.delete(`http://localhost:13000/inquiery/request/${id}`, {
      headers: this.header,
    });
  }
}
