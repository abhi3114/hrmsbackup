import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({ providedIn: 'root' })

export class LoginService {

 constructor(private http: HttpClient) {}
  login(credentails) {
    return this.http.post(environment.baseUrl + 'users/login', credentails)
  }

  logout() {
    return this.http.delete(environment.baseUrl + 'users/logout', {
     headers: new HttpHeaders({
      "Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'
     })
    })
  }

}
