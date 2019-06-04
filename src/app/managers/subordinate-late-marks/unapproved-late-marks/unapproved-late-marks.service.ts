import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UnapprovedLateMarksService {

  constructor(private http:HttpClient) { }
  getAllUnapprovedSubordinateLateMarks(start_date,end_date)
  {
    return this.http.get(environment.baseUrl+ "managers/late_marks/unapproved?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  sendForBulkLateMarksApproval(params){
    return this.http.post(environment.baseUrl+ "managers/late_marks/bulk_approve",params,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }
  sendForBulkLateMarksRejection(params){
    return this.http.post(environment.baseUrl+ "managers/late_marks/bulk_reject",params,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }
  getAllUnApprovedSpecificSubordinateLateMarks(start_date,end_date, user_id)
  {
    return this.http.get(environment.baseUrl+ "managers/late_marks/users/"+user_id+"/unapproved?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  sendForSingleLateMarksApproval(late_mark_id){
    return this.http.post(environment.baseUrl+ "managers/late_marks/"+late_mark_id+"/approve",late_mark_id,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }

  sendForSingleLateMarksRejection(late_mark_id){
    return this.http.delete(environment.baseUrl+ "managers/late_marks/"+late_mark_id+"/reject",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

}
