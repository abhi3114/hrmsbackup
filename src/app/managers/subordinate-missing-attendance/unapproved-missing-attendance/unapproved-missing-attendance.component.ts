import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { UnapprovedMissingAttendanceService } from './unapproved-missing-attendance.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { MonthYearService } from '../../../shared/service/month-year.service';

@Component({
  selector: 'app-unapproved-missing-attendance',
  templateUrl: './unapproved-missing-attendance.component.html',
  styleUrls: ['./unapproved-missing-attendance.component.css']
})
export class UnapprovedMissingAttendanceComponent implements OnInit {

  isCollapsed = false;
  unapproved_missing_attendace:any; showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;s
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router, private notification:NotificationService, private api:UnapprovedMissingAttendanceService,private monthandyear:MonthYearService) 
  {
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
    
  }

  ngOnInit() {
    this.api.getAllUnapprovedMissingAttendaces().subscribe(res => {
      this.unapproved_missing_attendace=res;
      this.leaveTableTrigger.next();
    }, (err) => {
     this.notification.showError(err.error);
    });
  }

  checkAll(){
    if ($('.check-box:checked').length > 0)
      $('.checkbox').prop('checked', true);
    else
      $('.checkbox').prop('checked', false);
  }

  save(){
    var attendance_missing_ids = []
    $('.checkbox:checked').each(function() {
      var id = $(this).attr('name');
      attendance_missing_ids.push(id);
    });
    var postdata = { "attendance_missing_ids":  attendance_missing_ids}
    if(attendance_missing_ids != undefined && attendance_missing_ids.length > 0)
    {
      this.api.sendForMissingAttendaceApproval(postdata).subscribe(res => {
        attendance_missing_ids = [];
        this.notification.showSuccess('Missing Attendance approved successfully');
        this.refreshData();
      }, (err) => {
        this.notification.showError(err.error);
      });
    }
    else
    {
      this.notification.CustomErrorMessage('Please check atleast one attendace');
    }
  }

  refreshData()
  {
    this.api.getAllUnapprovedMissingAttendaces().subscribe(res => {
      this.unapproved_missing_attendace=res;
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
