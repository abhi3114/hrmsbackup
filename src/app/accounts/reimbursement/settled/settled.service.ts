import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SettledService {  

constructor(private http:HttpClient) { }

getSettledReimbursementUsers(year,month)
  {
    return this.http.get(environment.baseUrl+ "accounts/reimbursements/settled?start_month="+month+"&start_year="+year,
    {headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
    "Content-Type": 'application/json'})})  

  }  

  getSinghleUserSettledData(year,month,user_id)
  {    
    return this.http.get(environment.baseUrl+ "accounts/reimbursements/users/"+user_id+"/settled?start_month="+month+"&start_year="+year,
   {headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
    "Content-Type": 'application/json'})})
  }

}