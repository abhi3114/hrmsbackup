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
    //console.log(month,year);
    //console.log(environment.baseUrl+ "leaves?start_date="+month+"&end_date="+year)
    return this.http.get(environment.baseUrl+"reimbursements/approved?start_month="+month+"&start_year="+year,
    { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
     "Content-Type": 'application/json'})})
  }

  getUnapproved(month,year)
  {
    return this.http.get(environment.baseUrl+"reimbursements/unapproved?start_month="+month+"&start_year="+year,
    { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
    "Content-Type": 'application/json'})})
  }

  getRejected(month,year)
  {
    return this.http.get(environment.baseUrl+"reimbursements/rejected?start_month="+month+"&start_year="+year,
    { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }

  createReimbursement(formData){
     return this.http.post(environment.baseUrl+'reimbursements/',formData,{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }

}
