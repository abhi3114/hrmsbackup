import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnapprovedService {

  constructor(private http:HttpClient) {
  }

  getAllUnapprovedSubordinateLeaves(start_date, end_date){
    return this.http.get(environment.baseUrl+ "managers/leaves/unapproved?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  getAllUnApprovedSpecificSubordinateLeaves(start_date,end_date, user_id) {
    return this.http.get(environment.baseUrl+ "managers/leaves/users/"+user_id+"/unapproved?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  sendForSingleLeaveApproval(leave_id) {
    return this.http.post(environment.baseUrl+ "managers/leaves/"+leave_id+"/approve",leave_id,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }

  sendForSingleLeaveRejection(leave_id) {
    return this.http.delete(environment.baseUrl+ "managers/leaves/"+leave_id+"/reject",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  sendForBulkLeavesApproval(params){
    return this.http.post(environment.baseUrl+ "managers/leaves/bulk_approve",params,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }

  sendForBulkLeavesRejection(params){
    return this.http.post(environment.baseUrl+ "managers/leaves/bulk_reject",params,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }
}
