import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryImportService {

  constructor(private http:HttpClient) { }

  importCsvData(params){
    console.log('111111111111');
    console.log("111"+JSON.stringify(params));
    return this.http.post(environment.baseUrl+"accounts/users/payments/import",params,
      {
      headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
}
