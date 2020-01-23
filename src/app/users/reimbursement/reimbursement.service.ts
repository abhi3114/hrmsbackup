import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
  })
export class Reimbursementservice
{
 constructor(private http: HttpClient) { }
  getAllFormAttribute(selectedCategory){
    return this.http.get(environment.baseUrl+ "reimbursements/categories/"+selectedCategory+"/data",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

    getApproved(month,year)
  {
    console.log(month,year);
    console.log(environment.baseUrl+ "leaves?start_date="+month+"&end_date="+year)
    return this.http.get(environment.baseUrl+"reimbursements/approved?start_month="+month+"&start_year="+year,
    { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
     "Content-Type": 'application/json'})})
  }

  getUnapproved()
  {
    return this.http.get(environment.baseUrl+"reimbursements/unapproved?start_month=1&start_year=2020",
    { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
    "Content-Type": 'application/json'})})
  }

  getRejected()
  {
    return this.http.get(environment.baseUrl+"reimbursements/rejected?start_month=1&start_year=2020",
    { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }

}
