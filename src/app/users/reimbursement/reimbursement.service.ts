import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
  })
export class Reimbursementservice
{
 constructor(private http: HttpClient) { }
  getAllFormAttribute(selectedCategory){
    return this.http.get(environment.baseUrl+ "reimbursements/categories/"+selectedCategory+"/data",
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }

}
