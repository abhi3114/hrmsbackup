import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) {}
  updatePassword(resetPasswordData){
    return this.http.put(environment.baseUrl + 'users/password', resetPasswordData)
  }
}
