import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnapprovedMissingAttendanceService {

  constructor(private http:HttpClient) { }

  getAllUnapprovedMissingAttendaces(){
    return this.http.get(environment.baseUrl+ "attendance_missings/manager/unapproved",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  sendForMissingAttendaceApproval(params){
    return this.http.post(environment.baseUrl+ "attendance_missings/manager/unapproved",params, {
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }
}
