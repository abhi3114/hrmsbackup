import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Component, OnInit,ViewChild } from '@angular/core';
import {Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {UnapprovedService} from './unapproved.service'
import { MonthYearService } from '../../../shared/service/month-year.service';
import { NotificationService } from '../../../shared/service/notification.service';
import * as moment from 'moment';


@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.component.html',
  styleUrls: ['./unapproved.component.css']
  })
export class UnapprovedComponent implements OnInit {

  isCollapsed = false;
  leaveids = [];
  unapprovedLeavesData={start_date:'',end_date:''};
  unapproved_leaves_data:any;unapprovedleavesData:any; showDataTable:Boolean;
  unapprovedLeavesForm: FormGroup;
 @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router, private api:UnapprovedService, private my:MonthYearService, private notification:NotificationService) {
    var filteredData=my.getFilterData();
    this.unapprovedLeavesData.start_date = filteredData[0].firstDay;
    this.unapprovedLeavesData.end_date = filteredData[0].lastDay;
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }

  ngOnInit() {
    var start_date=moment(this.unapprovedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getAllUnapprovedSubordinateLeave(start_date,end_date).subscribe(res => {
      this.unapproved_leaves_data=res;
      this.leaveTableTrigger.next();
      }, (err) => {
        this.notification.showError(err.error);
        });
  }

  checkALL()
  {
    if ($('.check-box:checked').length > 0)
    $('.checkbox').prop('checked', true);
    else
    $('.checkbox').prop('checked', false);
  }

  save(){
    var leave_ids = []
    $('.checkbox:checked').each(function() {
      var id = $(this).attr('name');
      leave_ids.push(id);
      });
    var postdata = { "leave_ids":  leave_ids}
    if(leave_ids != undefined && leave_ids.length > 0)
    {
      this.api.sendForLeaveApproval(postdata).subscribe(res => {
        leave_ids = []
        this.notification.showSuccess('Leave approved successfully');
        this.refreshData();
        }, (err) => {
          this.notification.showError(err.error);
          });
    }
    else
    {
      this.notification.CustomErrorMessage('Please check atleast one leave');
    }
  }

  refreshData()
  {
    var start_date=moment(this.unapprovedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getAllUnapprovedSubordinateLeave(start_date,end_date).subscribe(res => {
      this.unapproved_leaves_data=res;
      $('.check-box').prop('checked', false);
      this.rerender();
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
