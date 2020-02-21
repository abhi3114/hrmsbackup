import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UnsettledService {

constructor(private http:HttpClient) { }

getUnSettledReimbursementUsers(year,month)
{
  return this.http.get(`${environment.baseUrl}accounts/reimbursements/${month}/${year}/approved`,
  {headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
  "Content-Type": 'application/json'})})
}

getSinghleUserUnsettledData(year,month,user_id)
{    
  return this.http.get(`${environment.baseUrl}accounts/reimbursements/users/${user_id}/${month}/${year}/approved`,
  {headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
  "Content-Type": 'application/json'})})
}

importCsvData(month, year, params)
{
	return this.http.post(`${environment.baseUrl}accounts/reimbursements/${month}/${year}/import`, params,
  {
  headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
  "Content-Type": 'application/json'})})
}

getAllUserExportAllList(month,year)
{
  return this.http.get(`${environment.baseUrl}/accounts/reimbursements/${month}/${year}/export`,
  {
   headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
  "Content-Type": 'application/json'})})
}

}