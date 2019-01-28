import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
  })
export class PaymentReportService {

  constructor(private http: HttpClient) { }

  getComponentsforPaymentReport()
  {
    var components=[];
    components.push({item_id: 'EPF', item_text: 'EPF'});
    components.push({item_id: 'TDS', item_text: 'TDS'});
    components.push({item_id: 'Incentive', item_text: 'Incentive'});
    components.push({item_id: 'Earlier PF Deduction', item_text: 'Earlier PF Deduction'});
    components.push({item_id: 'Basic', item_text: 'Basic'});
    components.push({item_id: 'Special Allowance', item_text: 'Special Allowance'});
    components.push({item_id: 'HRA', item_text: 'HRA'});
    components.push({item_id: 'Travelling Allowance', item_text: 'Travelling Allowance'});
    components.push({item_id: 'Professional Tax', item_text: 'Professional Tax'});
    components.push({item_id: 'Additional Payout', item_text: 'Additional Payout'});
    return components;
  }
  getPaymentReport(start_date,end_date,titles)
  {
    return this.http.get(environment.baseUrl+ "accounts/reports/payouts?start_date="+start_date+"&end_date="+end_date+"&titles="+titles,
      { headers: new HttpHeaders({"Authorization": 'Token token=' + localStorage.getItem('token'),
        "Content-Type": 'application/json'})})
  }
}

