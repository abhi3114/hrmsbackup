import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RejectedOutdoorDutyService {
  constructor(private http:HttpClient) { }

  getAllRejectedOutdoorDuties() {
    return this.http.get(environment.baseUrl+ "managers/outdoor_duties/rejected",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  getRejectedSpecificSubordinateOutdoors(user_id) {
    return this.http.get(environment.baseUrl+ "managers/outdoor_duties/users/" + user_id + "/rejected",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
}
