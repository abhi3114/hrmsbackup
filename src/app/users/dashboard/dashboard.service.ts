import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
  })

export class DashBoardService {
  constructor(private http: HttpClient)
  {
  }
  login(credentails)
  {
    return this.http.post(environment.baseUrl+'users/login',credentails)
  }
  getAllInventory()
  {
    return this.http.get(environment.baseUrl+'inventories',
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  getAllLeaves(start_date,end_date)
  {
    return this.http.get(environment.baseUrl+ "leaves?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  getAllOutdoorDuties(start_date,end_date)
  {
    return this.http.get(environment.baseUrl+ "outdoors?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  getAllLateMarks(start_date,end_date)
  {
    return this.http.get(environment.baseUrl+ "late_marks?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  getAllMissingAttendance(start_date,end_date)
  {
    return this.http.get(environment.baseUrl+ "attendance_missings?start_date="+start_date+"&end_date="+end_date,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  getMentorshipFeedback()
  {
    return this.http.get(environment.baseUrl+ "feedbacks",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  applyforLeave(leaveData)
  {
    return this.http.post(environment.baseUrl+'leaves',leaveData,{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }
  applyforOutdoorDuties(outdoor_duties_data)
  {
    return this.http.post(environment.baseUrl+'outdoors',outdoor_duties_data,{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }
  applyforLateMark(late_mark_data)
  {
    return this.http.post(environment.baseUrl+'late_marks',late_mark_data,{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }
  applyforMissingAttendance(missing_attendance_data)
  {
    return this.http.post(environment.baseUrl+'attendance_missings',missing_attendance_data,{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }
  updateMissingAttendance(missing_attendance_id,missing_attendance_reason)
  {
    return this.http.post(environment.baseUrl+'attendance_missings/'+missing_attendance_id+'/update_reason',missing_attendance_reason,{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }
  recordLateMarkResponse(late_mark_id,late_mark_data)
  {
    return this.http.post(environment.baseUrl+'late_marks/'+late_mark_id+'/update_comment',late_mark_data,{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }

}
