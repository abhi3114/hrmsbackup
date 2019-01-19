import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit,ViewChild } from '@angular/core';
import {Observable,Subject} from 'rxjs';
import { NotificationService } from '../../../shared/service/notification.service';
import { DataTableDirective } from 'angular-datatables';
import { ApprovedService } from './approved.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import * as moment from 'moment';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {

  isCollapsed = false;
  approvedLeavesForm: FormGroup;
  approvedLeavesData={start_date:'',end_date:''};
  approved_leaves_data:any;approvedleavesData:any; showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router,private api:ApprovedService,private monthandyear:MonthYearService, private notification:NotificationService) {
    var filteredData=monthandyear.getFilterData();
    this.approvedLeavesData.start_date = filteredData[0].firstDay;
    this.approvedLeavesData.end_date = filteredData[0].lastDay;
    this.approvedLeavesForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }

  validateApprovedLeavesForm(){
    var start_date=moment(this.approvedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getallapprovedSubordinateLeave(start_date,end_date).subscribe(res => {
      this.approved_leaves_data=res;
      this.rerender();
    }, (err) => {
       this.notification.showError(err.error);
    });
  }

  ngOnInit() {
    var start_date=moment(this.approvedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getallapprovedSubordinateLeave(start_date,end_date).subscribe(res => {
      this.approved_leaves_data=res;
      this.leaveTableTrigger.next();
    }, (err) => {
       this.notification.showError(err.error);
    });
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.leaveTableTrigger.next();
    });
  }

}
