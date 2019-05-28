import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RejectedMissingAttendanceService {

  constructor(private http:HttpClient) {
  }

  getAllRejectedMissingAttendances(start_date, end_date) {
    return this.http.get(environment.baseUrl+ "managers/attendance_missings/rejected?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  getRejectedSpecificSubordinateMissingAttendance(start_date, end_date, user_id) {
    return this.http.get(environment.baseUrl+ "managers/attendance_missings/users/"+user_id+"/rejected?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

}
