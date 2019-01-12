import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
  })
export class AssetsService {

  constructor(private http: HttpClient) { }
  getAllInventory()
  {
    return this.http.get(environment.baseUrl+'inventories',
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
}
