import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import { CommonSalaryService } from '../../shared/service/common-salary.service';
import { Papa } from 'ngx-papaparse';
import { MonthYearService } from '../../shared/service/month-year.service';
import {Observable,Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../shared/service/notification.service';
import { SalaryImportService } from './salary-import.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-salary-import',
  templateUrl: './salary-import.component.html',
  styleUrls: ['./salary-import.component.css']
})
export class SalaryImportComponent implements OnInit {

  monthArray:any;yearArray:any;
  salary_filter={selectedmonth:'',selectedyear:''};
  filteredData:any; importedData:any;
  failedData:any;successData:any;
  canShowtable:boolean;
  postdata:any;
  sheet_data:any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  SuccessTableOptions: any;
  FailedTableOptions: any;
  SuccessTableTrigger: Subject<any> = new Subject();
  FailedTableTrigger: Subject<any> = new Subject();

  constructor(private monthandyear:MonthYearService, private api:CommonSalaryService, private notification:NotificationService, private salaryimport:SalaryImportService, private papa:Papa) { }

  ngOnInit() {
    this.canShowtable = false;
    this.monthArray=this.monthandyear.populateMonth();
    this.yearArray=this.monthandyear.populateYear();
    this.filteredData=this.salaryimport.getCsvImportMonthandYear();
    this.salary_filter.selectedmonth=this.filteredData.selectedmonth;
    this.salary_filter.selectedyear= this.filteredData.selectedyear;
    this.FailedTableOptions = {
      pagingType: 'full_numbers',
      pageLength: -1,
      retrieve:true,
      dom: 'Bfrtip',
      buttons: ['csv']
    };
    this.SuccessTableOptions = {
      pagingType: 'full_numbers',
      pageLength: -1,
      retrieve:true,
      dom: 'Bfrtip',
      buttons: ['csv']
    };
  }

  importCsv(){
    let file = (<HTMLInputElement>($('#csv-file')[0])).files[0];
    this.postdata = {};
    if(file == undefined)
    {
      this.notification.CustomErrorMessage('Please Select a csv file');
    }
    else
    {
      var can_import_sheet = true
      if(can_import_sheet)
      {
        var selectedmonth = this.salary_filter.selectedmonth
        var selectedYear = this.salary_filter.selectedyear
        this.papa.parse(file, {
          header: true,
          complete: (results) => {
            this.sheet_data = results.data
          }
        });
        this.postdata = { 'data':this.sheet_data,'month':selectedmonth,'year':selectedYear}
        console.log(this.postdata);
        this.salaryimport.importCsvData(this.postdata).subscribe(response => {
          this.importedData = response;
          this.displayImportedData();
          this.canShowtable = true;
          this.notification.showSuccess('Salary Imported Successfully');
        },
        (error) => {
          this.notification.showError('error due to Api');
        });
        if (this.canShowtable){
          this.FailedTableTrigger.next();
          this.SuccessTableTrigger.next();
        }
      }
      else
      {
        this.notification.CustomErrorMessage('cannot import sheet');
      }
    }
  }
  displayImportedData(){
    this.successData=[];
    this.failedData=[];
    this.importedData.forEach(sdata => {
     if(sdata.status =='Failed')
     {
       this.failedData.push({user:sdata.user,message:sdata.message});
     }
     else
     {
        this.successData.push({user:sdata.user,message:sdata.message});
      }
    });
  }

}
