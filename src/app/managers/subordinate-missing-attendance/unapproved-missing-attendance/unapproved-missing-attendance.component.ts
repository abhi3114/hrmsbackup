import { Component, OnInit,ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { UnapprovedMissingAttendanceService } from './unapproved-missing-attendance.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-unapproved-missing-attendance',
  templateUrl: './unapproved-missing-attendance.component.html',
  styleUrls: ['./unapproved-missing-attendance.component.css']
  })
export class UnapprovedMissingAttendanceComponent implements OnInit {

  isCollapsed = false;
  unapproved_missing_attendance:any; showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;s
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();
  user_unapproved_attendance_missing_data:any;
  modalRef: BsModalRef;
  user_id:any;

  constructor(private router:Router, private notification:NotificationService, private api:UnapprovedMissingAttendanceService,private monthandyear:MonthYearService, private modalService: BsModalService)
  {
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };

  }

  ngOnInit() {
    this.api.getAllUnapprovedMissingAttendances().subscribe(res => {
      this.unapproved_missing_attendance=res;
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
    this.api.getAllUnapprovedMissingAttendances().subscribe(res => {
      this.unapproved_missing_attendance=res;
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

  refreshList(user_id){
    this.user_id = user_id
    this.api.getAllUnApprovedSpecificSubordinateAttendanceMissing(this.user_id).subscribe(res => {
      this.user_unapproved_attendance_missing_data=res;
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  userAttendanceMissingList(template: TemplateRef<any>, l) {
    this.modalRef = this.modalService.show(template);
    this.user_id = l.user_id
    this.api.getAllUnApprovedSpecificSubordinateAttendanceMissing(this.user_id).subscribe(res => {
      this.user_unapproved_attendance_missing_data = res;
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  approveSingleAttendanceMissing(l){
    this.api.sendForSingleAttendanceMissingApproval(l).subscribe(res => {
    this.refreshData();
    this.refreshList(this.user_id)
    this.notification.showSuccess('Attendance Missing is approved successfully');
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  rejectSigleAttendanceMissing(l){
    this.api.sendForSingleAttendanceMissingRejection(l).subscribe(res => {
    this.refreshData();
    this.refreshList(this.user_id)
    this.notification.showSuccess('Attendance Missing is rejected successfully');
    }, (err) => {
      this.notification.showError(err.error);
    });
  }
}
