import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../shared/service/notification.service';
import { PaymentReportService } from './payment-report.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.css']
  })
export class PaymentReportComponent implements OnInit {
  dropdownList = [];
  dropdownSettings = {};
  paymentReportForm: FormGroup;report_data:any;reportHeader=[];showReport=false;
  paymentReportData={start_date:'',end_date:'',components:''};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  payemntReportTableOptions: any = {};
  paymentReportTableTrigger: Subject<any> = new Subject();
  constructor(private router:Router,private api:PaymentReportService,public toastr: NotificationService)
  {
    this.dropdownList = this.api.getComponentsforPaymentReport();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.paymentReportForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      components: new FormControl('', [Validators.required]),
      });
    this.payemntReportTableOptions = {
      pagingType: 'full_numbers',
      pageLength: -1,
      retrieve:true,
      dom: 'Bfrtip',
      buttons: ['csv','excel' ]
    };
    this.showReport=true;
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  validatePaymentReportForm()
  {
    this.api.getPaymentReport(this.paymentReportData.start_date,this.paymentReportData.end_date,this.paymentReportData.components).subscribe(res => {
      this.report_data=res;
      var headers=[];
      if(this.report_data.length>0)
      {
        _.each(this.report_data[0].data,function(data){
          headers.push({label:data.label});
          })
        for (var i=0;i<this.report_data.length;i++)
        {
          var sum=0;
          for(var j=0;j<this.report_data[i].data.length;j++)
          {
            sum=sum+this.report_data[i].data[j].amount;
          }
          this.report_data[i].total=sum;
        }
        this.reportHeader=headers;
        if(this.dtElement.dtInstance!=undefined)
        {
          this.rerender();
        }
        else
        {
          this.paymentReportTableTrigger.next();
        }
      }

      }, (err) => {
        this.toastr.showError(err.error);
        });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.paymentReportTableTrigger.unsubscribe();
  }
  rerender(): void {

    setTimeout(() => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.paymentReportTableTrigger.next();
        });
      }, 500)
  }


  convertAmountintoCurrency(number)
  {
    var n=number.toLocaleString('en-IN', {
      currency: 'INR',
      maximumFractionDigits: 0
      });
    return n;
  }

  ngOnInit()
  {
    /**/
  }

}
