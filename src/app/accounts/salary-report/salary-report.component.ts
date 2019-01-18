import { Component, OnInit,ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../shared/service/notification.service';
import { SalaryReportService } from './salary-report.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import { CommonSalaryService } from '../../shared/service/common-salary.service';
import * as FileSaver from "file-saver";
import * as _ from 'underscore';
import * as moment from 'moment';
@Component({
  selector: 'app-salary-report',
  templateUrl: './salary-report.component.html',
  styleUrls: ['./salary-report.component.css']
  })
export class SalaryReportComponent implements OnInit {
  salaryReportForm:FormGroup;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  salaryReportTableOptions: any = {};
  salaryReportTableTrigger: Subject<any> = new Subject();
  monthArray:any;yearArray:any;filteredData:any;report_data:any;
  reportList:any;headings:any;totals=[];sum:any;isShow=false;isHdfc=false;
  reportData=0;
  salary_report_filter={selectedmonth:'',selectedyear:''};
  constructor(private router:Router,private api:SalaryReportService,private monthandyear:MonthYearService,private commonsalary:CommonSalaryService,public toastr: NotificationService)
  {
    this.salaryReportForm = new FormGroup({
      year: new FormControl('', [Validators.required]),
      month: new FormControl('', [Validators.required])
      });
    this.salaryReportTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[-1,50, 100, 150, 200],
      ["All",50, 100, 150, 200 ]],
      dom: 'Bfrtip',
      buttons: ['csv','excel' ],
      responsive: true
    };
    this.monthArray=this.monthandyear.populateMonth();
    this.yearArray=this.monthandyear.populateYear();
    this.filteredData=this.commonsalary.getMonthandYear();
    this.salary_report_filter.selectedmonth=this.filteredData.selectedmonth;
    this.salary_report_filter.selectedyear= this.filteredData.selectedyear;

  }

  ngOnInit()
  {
    this.api.getSalaryReport(   this.salary_report_filter.selectedmonth,this.salary_report_filter.selectedyear).subscribe(res => {
      this.report_data=res;
      this.reportList = this.report_data.data;
      this.headings= this.report_data.headings;this.sum=0;
      for(var i=0;i<this.reportList.length;i++)
      {
        this.sum=this.sum+this.reportList[i].amount;
      }
      for(var i=0;i<this.headings.length;i++)
      {
        this.totals[this.headings[i]] = 0;
      }
      for(var i=0;i<this.reportList.length;i++)
      {
        for(var j=0;j<this.reportList[i].components.length;j++)
        {
          this.totals[this.reportList[i].components[j].title] += this.reportList[i].components[j].amount;
        }
      }
      this.reportData=this.reportList.length;
      this.totals=_.values(this.totals);this.salaryReportTableTrigger.next();
      this.isHdfc=true;
      }, (err) => {
        this.toastr.showError(err.error);
        this.isHdfc=false;
        });

  }

  getSalaryReportData()
  {
    this.totals=[];
    this.api.getSalaryReport(   this.salary_report_filter.selectedmonth,this.salary_report_filter.selectedyear).subscribe(res => {
      this.report_data=res;
      this.reportList = this.report_data.data;
      this.headings= this.report_data.headings;this.sum=0;
      for(var i=0;i<this.reportList.length;i++)
      {
        this.sum=this.sum+this.reportList[i].amount;
      }
      for(var i=0;i<this.headings.length;i++)
      {
        this.totals[this.headings[i]] = 0;
      }
      for(var i=0;i<this.reportList.length;i++)
      {
        for(var j=0;j<this.reportList[i].components.length;j++)
        {
          this.totals[this.reportList[i].components[j].title] += this.reportList[i].components[j].amount;
        }
      }
      this.reportData=this.reportList.length;
      this.totals=_.values(this.totals);  this.isHdfc=true;
      this.rerender();
      }, (err) => {
        this.toastr.showError(err.error);
        this.isHdfc=false;
        });
  }

  getAmountFromHeading = function(heading, components){
    var a= (_.find(components, function(c){ return c.title==heading}));
    if (a === undefined){
      return 0
      }else{
        return a.amount;
      }
    }
    rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.salaryReportTableTrigger.next();
        });
    }

    hdfcReport()
    {
      var sum1 = 0;var inc=1;var  date=moment().format('DD/MM/YYYY');
      if(this.reportList.length>0)
      {
        var tableHdfc = '<br><br><table border="1"><tr><th>Sr No.</th><th>NAME</th><th>HDFC A/C NO</th><th>Net Amount Payable(In Rs.)</th></tr>';
        _.each( this.reportList,function(rdata){
          if(rdata.details.hdfc_acccount_no !="" && _.isEmpty(rdata.details)!= true)
          {
            sum1 =  sum1 + rdata.amount
            tableHdfc+='<tr><td align="center">'+inc+'</td><td>'+rdata.name+'</td><td align="center">'+rdata.details.hdfc_acccount_no+'</td><td align="center">'+(rdata.amount).toLocaleString('en-IN',{currency: 'INR',maximumFractionDigits: 0})+'</td></tr>';
            inc=inc+1;
          }

          });
        tableHdfc+='<tr><td></td><td></td><td></td><td align="center">'+this.api.convertAmountintoCurrency(sum1)+'</td></tr></table>';
        tableHdfc+='<div style="text-align:left;font-weight:bold;">Rupees '+this.api.getAmountinWord(sum1)+'</div>';
        tableHdfc+='<div style="text-align:right;">Thanking you,<br><br>Yours faithfully,<br><br>For PropertyPistol Realty Pvt Ltd<br><br><br><br><span style="font-weight:bold;">Authorised Signatory</span></div>';
        tableHdfc+='<div>Encl : Cheque</div>';
        var data='<div style="text-align:right;">DATE - ' + date + '</div>';
        data+='<div style="text-align:left;">To,<br>The Corporate Salary Manager,<br>HDFC Bank Ltd., Belapur Branch.<br><br>Dear Sir / Madam,<br>Enclosed please find herewith our cheque no 003167 dated '+date+' for Rs. '+this.api.convertAmountintoCurrency(sum1)+'/- (Rupees '+this.api.getAmountinWord(sum1)+'). We request you to please credit the Monthly Salary of our Staff Members for the month of  '+ _.find(this.monthArray,{id:parseInt(this.salary_report_filter.selectedmonth)}).name +' '+this.salary_report_filter.selectedyear+', to their respective Accounts with you  immediately, as per the following details.</div>';
        data += tableHdfc;
        var html_document = '<!DOCTYPE html><html><head><title></title><style>table{width:80%;} body{ margin:50px 50px;}</style>';
        html_document  += '</head><body>' + data + '</body></html>';
        let HdfcWorddata = new Blob([html_document], { type: 'type: "application/doc"' });
        var title="HDFC_Report_"+_.find(this.monthArray,{id:parseInt(this.salary_report_filter.selectedmonth)}).name+"_"+this.salary_report_filter.selectedyear+".doc";
        saveAs(HdfcWorddata, title);
        }else{
          this.toastr.CustomErrorMessage("Enable to download.No data present.");
        }
      }

    }
