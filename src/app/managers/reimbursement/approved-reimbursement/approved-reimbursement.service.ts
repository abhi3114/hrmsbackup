import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class approvedReimbursementService
{
  
  constructor(private http:HttpClient) { }
  

  getApprovedService(year,month)
  {
    return this.http.get(environment.baseUrl+ "managers/reimbursements/approved?start_month="+month+"&start_year="+year,
        {headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})  
  }
 getUserRembursementData(year,month,user_id)
  {    
    return this.http.get(environment.baseUrl+ "managers/reimbursements/users/"+user_id+"/approved?start_month="+month+"&start_year="+year,
        {headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  sendForSingleReimbursementRejection(reimbursement_id)
  {    
    return this.http.put(environment.baseUrl+ "managers/reimbursements/"+reimbursement_id+"/reject",reimbursement_id,
    { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }

   sendForBulkReimbursementRejected(params)
  {  

    console.log(params)
    return this.http.put(environment.baseUrl+ "managers/reimbursements/bulk_reject",params,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }

}