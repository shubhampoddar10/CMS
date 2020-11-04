import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers , Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class EnquiryFormService {
  header = new Headers({ token: localStorage.getItem('token') })
  constructor(private http$: Http) { }

  public postEnquiry(data): Observable<any> {
    console.log('calling api', data);
    return this.http$.post('http://localhost:13000/inquiery/request', data, { headers: this.header });
  }

  public getListById(id: any): Observable<any> {
    console.log('calling api list');

    return this.http$.get(`http://localhost:13000/inquiery/request/${id}`, { headers: this.header });
  }

  public editList(id: any, data: any ): Observable<any> {
    console.log('calling edit api');

    return this.http$.patch(`http://localhost:13000/inquiery/request/${id}`, data, { headers: this.header });
  }
}
