import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  logout(){
    return this.http.delete(environment.baseUrl+'users/logout',
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }
}
