import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoosterSessionService {

  constructor(private http: HttpClient) { }
    getBoosterSessions()
  {
    return this.http.get(environment.baseUrl+'booster_sessions',
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
}
