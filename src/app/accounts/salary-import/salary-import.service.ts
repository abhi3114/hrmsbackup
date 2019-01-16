import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryImportService {

  constructor(private http:HttpClient) { }

  importCsvData(data){
    return this.http.post(environment.baseUrl+"accounts/users/payments/import",data,
      {
      headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
}
