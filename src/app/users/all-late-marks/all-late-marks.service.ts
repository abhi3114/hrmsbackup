import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
  })
export class AllLateMarksService {

  constructor(private http: HttpClient) { }
  getAllLateMarks(start_date,end_date)
  {
    return this.http.get(environment.baseUrl+ "late_marks?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
    recordLateMarkResponse(late_mark_id,late_mark_data)
  {
    return this.http.post(environment.baseUrl+'late_marks/'+late_mark_id+'/update_comment',late_mark_data,{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }
}
