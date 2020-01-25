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
  
}