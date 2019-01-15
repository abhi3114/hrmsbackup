import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnapprovedOutdoorDutiesService {

  constructor(private http:HttpClient) { }

  getAllUnapprovedOutDoorDuties(){
    return this.http.get(environment.baseUrl+ "outdoors/manager/unapproved",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  sendForOutDoorDutiesApproval(params){
    return this.http.post(environment.baseUrl+ "outdoors/manager/unapproved",params, {
      headers: {
        "Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      }
    })
  }
}
