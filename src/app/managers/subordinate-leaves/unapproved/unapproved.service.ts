import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnapprovedService {

  constructor(private http:HttpClient) {
  }

  getAllUnapprovedSubordinateLeave(start_date, end_date){
    return this.http.get(environment.baseUrl+ "leaves/manager/unapproved?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  sendForLeaveApproval(params){
    return this.http.post(environment.baseUrl+ "leaves/manager/unapproved",params, {
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }
}
