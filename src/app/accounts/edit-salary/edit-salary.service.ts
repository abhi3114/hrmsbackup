import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
  })
export class EditSalaryService {

  constructor(private http: HttpClient) { }

  getUserSalaryDetails(user_id)
  {
    return this.http.get(environment.baseUrl+ "accounts/users/"+user_id,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  getUserPayemntDetails(user_id,month,year)
  {
    return this.http.get(environment.baseUrl+ "accounts/users/"+user_id+"/salaries/"+month+"/"+year+"/payments",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  editPayment(user_id,params)
  {
    return this.http.post(environment.baseUrl+ "accounts/users/"+user_id+"/payments",params,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  reprocessSalary(user_id,payment_id,params)
  {
    return this.http.post(environment.baseUrl+ "accounts/users/"+user_id+"/payments/"+payment_id+"/reprocess",params,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  deleteSalary(user_id,salary_id)
  {
    return this.http.delete(environment.baseUrl+ "accounts/users/"+user_id+"/salaries/"+salary_id,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  editSalary(user_id,params)
  {
    return this.http.post(environment.baseUrl+"accounts/users/"+user_id+"/salaries",params,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  undoPayment(user_id,payment_id)
  {
    return this.http.delete(environment.baseUrl+ "accounts/users/"+user_id+"/payments/"+payment_id,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

}
