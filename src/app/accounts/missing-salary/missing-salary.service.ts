import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
  })
export class MissingSalaryService {

  constructor(private http: HttpClient) { }
  getallUser()
  {
    return this.http.get(environment.baseUrl+ "accounts/users/salaries/missing/",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
}
