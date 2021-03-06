import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnapprovedOutdoorDutiesService {

  constructor(private http:HttpClient) { }

  getAllUnapprovedOutDoorDuties(start_date,end_date){
    return this.http.get(environment.baseUrl+ "managers/outdoor_duties/unapproved?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  sendForSingleOutdoorApproval(outdoor_id){
    return this.http.post(environment.baseUrl+ "managers/outdoor_duties/"+outdoor_id+"/approve",outdoor_id,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }

  sendForSingleOutdoorRejection(outdoor_id){
    return this.http.delete(environment.baseUrl+ "managers/outdoor_duties/"+outdoor_id+"/reject",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  getAllUnApprovedSpecificSubordinateOutdoors(start_date,end_date, user_id)
  {
    return this.http.get(environment.baseUrl+ "managers/outdoor_duties/users/"+user_id+"/unapproved?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  sendForBulkOutdoorsApproval(params){
    return this.http.post(environment.baseUrl+ "managers/outdoor_duties/bulk_approve",params,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }

  sendForBulkOutdoorsRejection(params){
    return this.http.post(environment.baseUrl+ "managers/outdoor_duties/bulk_reject",params,{
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }
}
