import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AgentHelpdeskservice {

	constructor(private http: HttpClient) { }
	getAllOpenAdminTickets()
	{
		return this.http.get(environment.baseUrl+'admin/tickets/open',
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'})})
	}

	getAllClosedAdminTickets()
	{
		return this.http.get(environment.baseUrl+'admin/tickets/closed',
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'})})
	}

	getAllAdminTickets()
	{
		return this.http.get(environment.baseUrl+'admin/tickets',
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'})})
	}


	updateTicket(payload,id)
	{
		console.log('URL',environment.baseUrl+'admin/tickets'+id)
		console.log('Payload',payload);
		return this.http.post(environment.baseUrl+'admin/tickets/'+id,payload,
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'})})
	}

	
	getCategory()
	{
		return this.http.get(environment.baseUrl+ 'admin/tickets/statuses',
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'})})
	}
	getTicketInfo(id){
		console.log('this is my URL',environment.baseUrl+ 'admin/tickets/'+id)
		return this.http.get(environment.baseUrl+ 'admin/tickets/'+id,
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'})})
	}


}
