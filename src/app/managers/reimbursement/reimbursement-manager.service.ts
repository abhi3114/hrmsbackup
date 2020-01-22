import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ReimbursementManagerService
{
  
  constructor(private http:HttpClient) { }

  getApproved()
  {
    return this.http.get(environment.baseUrl+"reimbursements/approved?start_month=1&start_year=2020",
    { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
     "Content-Type": 'application/json'})})
  }

  getUnapproved()
  {
    return this.http.get(environment.baseUrl+"reimbursements/unapproved?start_month=1&start_year=2020",
    { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
    "Content-Type": 'application/json'})})
  }

  getRejected()
  {
    return this.http.get(environment.baseUrl+"reimbursements/unapproved?start_month=1&start_year=2020",
    { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }


}