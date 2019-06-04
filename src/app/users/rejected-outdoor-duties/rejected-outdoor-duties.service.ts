import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RejectedOutdoorDutiesService {

  constructor(private http: HttpClient) { }

  getAllRejectedOutDoorDuties(start_date,end_date)
  {
    return this.http.get(environment.baseUrl+ "outdoors/rejected?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
}
