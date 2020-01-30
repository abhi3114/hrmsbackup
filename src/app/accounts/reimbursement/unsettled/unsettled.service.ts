import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UnsettledService {  

constructor(private http:HttpClient) { }

getUnSettledReimbursementUsers(year,month)
{
   return this.http.get(environment.baseUrl+ "accounts/reimbursements/approved?start_month="+month+"&start_year="+year,
    {headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
    "Content-Type": 'application/json'})})  
}

getSinghleUserUnsettledData(year,month,user_id)
{    
    return this.http.get(environment.baseUrl+ "accounts/reimbursements/users/"+user_id+"/approved?start_month="+month+"&start_year="+year,
   {headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
    "Content-Type": 'application/json'})})
}

}