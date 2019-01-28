import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
  })
export class PaymentComponentsService {

  constructor() { }
  getPaymentComponents()
  {
    var payemnt_components=[];
    payemnt_components.push("Incentive");  payemnt_components.push("Special Allowance");
    payemnt_components.push("EPF"); payemnt_components.push("Earlier PF Deduction");
    payemnt_components.push("TDS");   payemnt_components.push("Other Deductions");
    payemnt_components.push("Salary Advance"); payemnt_components.push("Overtime");
    payemnt_components.push("Arrears");  payemnt_components.push("ESIC Deduction");
    return payemnt_components;
  }
}
