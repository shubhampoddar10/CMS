import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobCardService {

  header = new HttpHeaders({token: localStorage.getItem('token')})

  constructor(private http: HttpClient) { }

  postJobCard(jobCardData) {
    return this.http.post('http://localhost:13000/enquiry/jobcard', jobCardData, {headers: this.header})
  }


  getJobCard(id: string) {
    return this.http.get<{data: any}>('http://localhost:13000/enquiry/jobcard/' + id, {headers: this.header})
      // .pipe(map((responseData) => {
      //   return {
      //     id: responseData.data._id,
      //     date: responseData.data.date,
      //     mode: responseData.data.mode,
      //     type: responseData.data.type,
      //     activity: responseData.data.activity,
      //     incoTerms: responseData.data.incoTerms
      //   }
      // }))
      
  }

  editList(id: string, jobCardData: any) {
    return this.http.put(`http://localhost:13000/enquiry/jobcard/${id}`, jobCardData, {headers: this.header})
  }
}
