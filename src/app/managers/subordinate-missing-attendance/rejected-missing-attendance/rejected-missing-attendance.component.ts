import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {Observable,Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../../shared/service/notification.service';
import { RejectedMissingAttendanceService } from './rejected-missing-attendance.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import * as moment from 'moment';

@Component({
  selector: 'app-rejected-missing-attendance',
  templateUrl: './rejected-missing-attendance.component.html',
  styleUrls: ['./rejected-missing-attendance.component.css']
})
export class RejectedMissingAttendanceComponent implements OnInit {

  isCollapsed = false;
  rejectedMissingAttendanceForm: FormGroup;
  rejectedMissingAttendanceData={start_date:'',end_date:''};
  rejected_missing_attendance_data:any; showDataTable:Boolean;
  user_rejected_missing_attendance:any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();
  modalRef: BsModalRef;

  constructor(private router:Router, private api:RejectedMissingAttendanceService, private monthandyear:MonthYearService, private notification:NotificationService, private modalService: BsModalService) {
    var filteredData=monthandyear.getFilterData();
    this.rejectedMissingAttendanceForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
    this.rejectedMissingAttendanceData.start_date = filteredData[0].firstDay;
    this.rejectedMissingAttendanceData.end_date = filteredData[0].lastDay;
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }

  ngOnInit() {
    var start_date = moment(this.rejectedMissingAttendanceData.start_date).format('DD/MM/YYYY');
    var end_date = moment(this.rejectedMissingAttendanceData.end_date).format('DD/MM/YYYY');
    this.api.getAllRejectedMissingAttendances(start_date, end_date).subscribe(res => {
      this.rejected_missing_attendance_data=res;
      this.leaveTableTrigger.next();
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.leaveTableTrigger.next();
    });
  }

  validateRejectedMissingAttendanceForm(){
    var start_date = moment(this.rejectedMissingAttendanceData.start_date).format('DD/MM/YYYY');
    var end_date = moment(this.rejectedMissingAttendanceData.end_date).format('DD/MM/YYYY');
    this.api.getAllRejectedMissingAttendances(start_date, end_date).subscribe(res => {
      this.rejected_missing_attendance_data = res;
      this.rerender();
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  userMissingAttendanceList(template: TemplateRef<any>, l) {
    this.modalRef = this.modalService.show(template);
    var start_date=moment(this.rejectedMissingAttendanceData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.rejectedMissingAttendanceData.end_date).format('DD/MM/YYYY');
    var user_id = l.user_id
    this.api.getRejectedSpecificSubordinateMissingAttendance(start_date, end_date, user_id).subscribe(res => {
      this.user_rejected_missing_attendance = res;
    }, (err) => {
      this.notification.showError(err.error);
    });
  }
}
