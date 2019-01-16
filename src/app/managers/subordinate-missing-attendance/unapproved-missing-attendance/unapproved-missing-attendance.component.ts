import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
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
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router, private notification:NotificationService, private api:UnapprovedMissingAttendanceService,private monthandyear:MonthYearService) {
  }

  ngOnInit() {
    this.api.getAllUnapprovedMissingAttendaces().subscribe(res => {
      this.unapproved_missing_attendace=res;
      this.leaveTableOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      this.leaveTableTrigger.next();
      }, (err) => {
      alert(err.error);
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
        attendance_missing_ids = []
        this.api.getAllUnapprovedMissingAttendaces().subscribe(res => {
          this.unapproved_missing_attendace=res;
          this.notification.showSuccess('Missing Attendance approved successfully');
          }, (err) => {
          this.notification.showError('err.error')
        });
        }, (err) => {
        this.notification.showError('err.error');
      });
    }
    else
    {
      this.notification.CustomErrorMessage('Please check atleast one Attendace');
    }
  }

}
