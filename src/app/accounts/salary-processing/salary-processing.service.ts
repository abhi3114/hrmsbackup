import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
  })
export class SalaryProcessingService {

  constructor(private http: HttpClient) { }
  getallUser()
  {
    return this.http.get(environment.baseUrl+ "accounts/users",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  processSalary(month,year,params)
  {
    return this.http.post(environment.baseUrl+"accounts/users/salaries/"+month+"/"+year+"/process",params,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  toggleSalarySlipDownload(month,year,params)
  {
    return this.http.post(environment.baseUrl+"accounts/users/payments/"+month+"/"+year+"/toggle",params,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
}
