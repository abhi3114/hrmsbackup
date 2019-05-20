import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UnapprovedLateMarksService {

  constructor(private http:HttpClient) { }
  getAllUnapprovedSubordinateLateMarks(start_date,end_date)
  {
    return this.http.get(environment.baseUrl+ "managers/late_marks/unapproved?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  sendForLateMarksApproval(params){
    return this.http.post(environment.baseUrl+ "managers/late_marks/bulk_approve",params,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }
  sendForLateMarksRejection(params){
    return this.http.post(environment.baseUrl+ "manager/late_marks/"+params+"/reject", {
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }
  getAllUnApprovedSpecificSubordinateLateMarks(start_date,end_date, user_id)
  {
    return this.http.get(environment.baseUrl+ "managers/late_marks/users/"+user_id+"/unapproved?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
}
