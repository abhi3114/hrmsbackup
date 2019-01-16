import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
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

  getUserPayemntDetails(user_id,month,year)
  {
    return this.http.get(environment.baseUrl+ "accounts/users/"+user_id+"/salaries/"+month+"/"+year+"/payments",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  getMonthandYear(){
    var currentDate=moment();
    var end = new Date().getFullYear();
    var startOfMonth = moment().startOf('month');
    var tenthDayOfMonth=moment(startOfMonth).add(10,'d');
    if (currentDate.isBetween(startOfMonth, tenthDayOfMonth))
    {
      var currentmonth= new Date().getMonth();
      if(currentmonth == 0){
        var currentmonth= 12;
        var y=(end-1).toString();
      }
      else{
        var y=end.toString();
      }
    }
    else
    {
      var currentmonth= new Date().getMonth()+1; var y=end.toString();
    }

    var selectedmonth= currentmonth.toString();
    var selectedyear=y;

    var data={selectedmonth,selectedyear}
    return data
  }
}
