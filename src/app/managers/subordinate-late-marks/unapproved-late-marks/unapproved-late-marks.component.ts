import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { UnapprovedLateMarksService } from './unapproved-late-marks.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import { NotificationService } from '../../../shared/service/notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-unapproved-late-marks',
  templateUrl: './unapproved-late-marks.component.html',
  styleUrls: ['./unapproved-late-marks.component.css']
})
export class UnapprovedLateMarksComponent implements OnInit {

  isCollapsed = false;
  unapproved_late_mark_data:any; showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router,private api:UnapprovedLateMarksService,private monthandyear:MonthYearService, private notification: NotificationService)
  {
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }

  ngOnInit() {
    this.api.getAllUnapprovedSubordinateLateMarks().subscribe(res => {
      this.unapproved_late_mark_data=res;
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

  save()
  {
    var unapproved_late_marks = []
    $('.checkbox:checked').each(function() {
      var id = $(this).attr('name');
      unapproved_late_marks.push(id);
    });
    var postdata = { "late_mark_ids":  unapproved_late_marks}
    if(unapproved_late_marks != undefined && unapproved_late_marks.length > 0)
    {
      this.api.sendForLateMarksApproval(postdata).subscribe(res => {
        unapproved_late_marks = [];
        this.notification.showSuccess('Late mark approved successfully');
        this.refreshData();
      }, (err) => {
        this.notification.showError(err.error);
      });
    }
    else
    {
      this.notification.CustomErrorMessage('Please check atleast one Late Mark');
    }
  }

  refreshData()
  {
    this.api.getAllUnapprovedSubordinateLateMarks().subscribe(res => {
      this.unapproved_late_mark_data=res;
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
