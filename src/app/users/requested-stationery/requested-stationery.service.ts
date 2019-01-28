import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
  })
export class RequestedStationeryService {

  constructor(private http: HttpClient) { }
  getAllStationeryItems()
  {
    return this.http.get(environment.baseUrl+'stationaries',
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
  getAllStationery()
  {
    return this.http.get(environment.baseUrl+'stationaries/requests',
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

  requestStationery(params)
  {
    return this.http.post(environment.baseUrl+'stationaries/request-new',params,{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }
  deleteRequestedStationery(id)
  {
    return this.http.delete(environment.baseUrl+'stationaries/requests/'+id,{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
      "Content-Type": 'application/json'})})
  }
}
