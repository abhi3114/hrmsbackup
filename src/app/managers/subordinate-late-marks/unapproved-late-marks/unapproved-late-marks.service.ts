import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UnapprovedLateMarksService {

  constructor(private http:HttpClient) { }
  getAllUnapprovedSubordinateLateMarks()
  {
    return this.http.get(environment.baseUrl+ "late_marks/manager/unapproved",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  sendForLateMarksApproval(params){
    return this.http.post(environment.baseUrl+ "late_marks/manager/unapproved",params, {
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }
}
