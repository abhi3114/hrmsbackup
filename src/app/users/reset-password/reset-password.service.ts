import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
	providedIn: 'root'
})
export class ResetPasswordService {

	constructor(private http: HttpClient) { }

	resetpassword(params) {
		return this.http.post(environment.baseUrl +'users/reset_password',params, {
			headers: new HttpHeaders({
				"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'
			})
		})
	}
}
