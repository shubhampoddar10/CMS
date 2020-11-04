import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobListService {

  header = new HttpHeaders({token: localStorage.getItem('token')})

  constructor(private http: HttpClient) { }

  getJobList() {
    return this.http.get<{result: any}>('http://localhost:13000/enquiry/jobcard', {headers: this.header})
  }

  deleteJobList(id: string) {
    return this.http.delete('http://localhost:13000/enquiry/jobcard/' + id, {headers: this.header})
  }


}
