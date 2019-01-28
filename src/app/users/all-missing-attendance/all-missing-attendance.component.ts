import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../shared/service/notification.service';
import { AllMissingAttendanceService } from './all-missing-attendance.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import * as moment from 'moment';
@Component({
  selector: 'app-all-missing-attendance',
  templateUrl: './all-missing-attendance.component.html',
  styleUrls: ['./all-missing-attendance.component.css']
  })
export class AllMissingAttendanceComponent implements OnInit {
  isCollapsed = false;
  missingAttendanceForm: FormGroup;updateMissingAttendanceForm:FormGroup;
  missingAttendanceData={start_date:'',end_date:''}; updateMissingAttendanceData={reason:''};
  api_data:any;missingattendanceData:any;  missing_attendance_Id:any;user_data:any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  missingAttendanceTableOptions: DataTables.Settings = {};
  missingAttendanceTableTrigger: Subject<any> = new Subject();
  modalRef: BsModalRef;
  constructor(private router:Router,private api:AllMissingAttendanceService,private monthandyear:MonthYearService,private modalService: BsModalService,public toastr: NotificationService)
  {
    var filteredData=monthandyear.getFilterData();
    this.missingAttendanceData.start_date = filteredData[0].firstDay;
    this.missingAttendanceData.end_date = filteredData[0].lastDay;
    this.missingAttendanceForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      });
    this.updateMissingAttendanceForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
      });
    this.missingAttendanceTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }

  validateMissingAttendanceForm()
  {
    var start_date=moment(this.missingAttendanceData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.missingAttendanceData.end_date).format('DD/MM/YYYY');
    this.api.getAllMissingAttendance(start_date,end_date).subscribe(res => {
      this.api_data=res;
      this.missingattendanceData=this.api_data.attendance_missing_data;
      this.rerender();
      }, (err) => {
        this.toastr.showError(err.error);
        });

  }
  ngOnInit()
  {
    var start_date=moment(this.missingAttendanceData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.missingAttendanceData.end_date).format('DD/MM/YYYY');
    this.api.getAllMissingAttendance(start_date ,end_date).subscribe(res => {
      this.api_data=res;
      this.missingattendanceData=this.api_data.attendance_missing_data;
      this.missingAttendanceTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        })
  }
  updateMissingAttendance(template: TemplateRef<any>,maId,mareason)
  {
    this.missing_attendance_Id=maId;
    this.modalRef = this.modalService.show(template);
    this.updateMissingAttendanceData.reason=mareason;
  }
  validateUpdateMissingAttendanceForm()
  {
    this.api.updateMissingAttendance(this.missing_attendance_Id,this.updateMissingAttendanceData).subscribe(res => {
      this.user_data=res;
      this.modalRef.hide();
      this.toastr.showSuccess('Response Recorded');
      this.updateMissingAttendanceForm.reset();
      this.validateMissingAttendanceForm();
      }, (err) => {
        this.toastr.showError(err.error);
        this.modalRef.hide();
        this.updateMissingAttendanceForm.reset();
        });
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.missingAttendanceTableTrigger.next();
      });
  }


}
