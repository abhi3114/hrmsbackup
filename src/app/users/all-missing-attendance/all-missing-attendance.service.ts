import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
  })
export class AllMissingAttendanceService {

  constructor(private http: HttpClient) { }
  getAllMissingAttendance(start_date,end_date)
  {
    return this.http.get(environment.baseUrl+ "attendance_missings?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
}
