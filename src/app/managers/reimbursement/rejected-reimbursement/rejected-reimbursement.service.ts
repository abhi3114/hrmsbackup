import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class rejectedReimbursementService
{
  
  constructor(private http:HttpClient) { }
  
  getRejectedService(year,month)
  {   
    return this.http.get(environment.baseUrl+ "managers/reimbursements/rejected?start_month="+month+"&start_year="+year,
        {headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})  
  }

  getUserRejectedData(year,month,user_id)
  {
    return this.http.get(environment.baseUrl+"managers/reimbursements/users/"+user_id+"/rejected?start_month="+month+"&start_year="+year,
    {headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  } 

  sendForSingleReimbursementApproval(reimbursement_id)
  {
    return this.http.put(environment.baseUrl+ "managers/reimbursements/"+reimbursement_id+"/approve",reimbursement_id,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'}})
  }

}