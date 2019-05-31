import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApprovedLateMarksService {

  constructor(private http: HttpClient) { }
  getAllApprovedSubordinateLateMarks(start_date,end_date)
  {
    return this.http.get(environment.baseUrl+ "managers/late_marks/approved?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  getAllApprovedSpecificSubordinateLateMarks(start_date,end_date, user_id)
  {
    return this.http.get(environment.baseUrl+ "managers/late_marks/users/"+user_id+"/approved?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
}
