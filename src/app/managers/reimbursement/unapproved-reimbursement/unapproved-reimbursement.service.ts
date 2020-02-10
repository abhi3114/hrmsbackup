import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class unApprovedReimbursementService{

  constructor(private http: HttpClient) { }

  getUnapprovedService(year,month)
  {
    return this.http.get(environment.baseUrl+ "managers/reimbursements/unapproved?start_month="+month+"&start_year="+year,
        {headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  getUserUnapprovedData(year,month, user_id)
  {
    return this.http.get(environment.baseUrl+"managers/reimbursements/users/"+user_id+"/unapproved?start_month="+month+"&start_year="+year,
      {headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  sendForSingleReimbursementApproval(reimbursement_id, reason)
  {
    return this.http.put(environment.baseUrl+ "managers/reimbursements/"+reimbursement_id+"/approve?reason="+reason,reimbursement_id,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'}})
  }

  sendForSingleReimbursementRejection(reimbursement_id, reason)
  {
    return this.http.put(environment.baseUrl+ "managers/reimbursements/"+reimbursement_id+"/reject?reason="+reason,reimbursement_id,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  sendForBulkReimbursementApproval(params)
  {
    return this.http.put(environment.baseUrl+ "managers/reimbursements/bulk_approve",params,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }
  sendForBulkReimbursementRejected(params)
  {
    return this.http.put(environment.baseUrl+ "managers/reimbursements/bulk_reject",params,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }
}
