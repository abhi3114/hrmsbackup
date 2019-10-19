import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class Helpdeskservice {

	constructor(private http: HttpClient) { }
	getAllOpenTickets()
	{
		return this.http.get(environment.baseUrl+'users/tickets/open',
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'})})
	}

	getAllClosedTickets()
	{
		return this.http.get(environment.baseUrl+'users/tickets/closed',
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'})})
	}

	getAllTickets()
	{
		return this.http.get(environment.baseUrl+'users/tickets',
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'})})
	}


	addNewTicket(payload)
	{
		return this.http.post(environment.baseUrl+ 'users/tickets',payload,
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'})})
	}

	escalateTicket(ticketId)
	{
		return this.http.post(environment.baseUrl+'users/tickets/'+ticketId+'/escalate',null,
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'})})
	}
	
	deleteTicket(ticketId)
	{
		return this.http.delete(environment.baseUrl+'users/tickets/'+ticketId,
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'})})
	}
	getCategory()
	{
		return this.http.get(environment.baseUrl+ 'users/tickets/settings',
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'})})
	}

	getTicketInfo(id){
		
		return this.http.get(environment.baseUrl+ 'users/tickets/'+id,
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
				"Content-Type": 'application/json'})})
	}
	reopenTicket(id){
	
		return this.http.post(environment.baseUrl+ 'users/tickets/'+id+'/reopen',null,
			{ headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
		"Content-Type": 'application/json'})})
	}



}
