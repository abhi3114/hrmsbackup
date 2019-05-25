import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnapprovedMissingAttendanceService {

  constructor(private http:HttpClient) { }

  getAllUnapprovedMissingAttendances(){
    return this.http.get(environment.baseUrl+ "managers/attendance_missings/unapproved",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  getAllUnApprovedSpecificSubordinateAttendanceMissing(user_id) {
    return this.http.get(environment.baseUrl+ "managers/attendance_missings/users/"+user_id+"/unapproved",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  sendForMissingAttendaceApproval(params){
    return this.http.post(environment.baseUrl+ "attendance_missings/manager/unapproved",params, {
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }

  sendForSingleAttendanceMissingApproval(attendance_missing_id){
    return this.http.post(environment.baseUrl+ "managers/attendance_missings/"+attendance_missing_id+"/approve",attendance_missing_id, {
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }

  sendForSingleAttendanceMissingRejection(attendance_missing_id){
    return this.http.delete(environment.baseUrl+ "managers/attendance_missings/"+attendance_missing_id+"/reject",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  sendForBulkAttendanceMissingRejection(params){
    return this.http.post(environment.baseUrl+ "managers/attendance_missings/bulk_reject",params,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }

  sendForBulkAttendanceMissingApproval(params){
    return this.http.post(environment.baseUrl+ "managers/attendance_missings/bulk_approve",params,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }
}
