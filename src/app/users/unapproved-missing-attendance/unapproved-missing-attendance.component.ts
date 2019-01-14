import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UnapprovedMissingAttendanceService } from './unapproved-missing-attendance.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import * as moment from 'moment';
@Component({
  selector: 'app-unapproved-missing-attendance',
  templateUrl: './unapproved-missing-attendance.component.html',
  styleUrls: ['./unapproved-missing-attendance.component.css']
  })
export class UnapprovedMissingAttendanceComponent implements OnInit {
  isCollapsed = false;
  missingAttendanceForm: FormGroup;updateMissingAttendanceForm:FormGroup;
  missingAttendanceData={start_date:'',end_date:''};updateMissingAttendanceData={reason:''};
  api_data:any;missingattendanceData:any;   missing_attendance_Id:any;user_data:any;
  missingAttendanceTableOptions: DataTables.Settings = {};
  missingAttendanceTableTrigger: Subject<any> = new Subject();
  modalRef: BsModalRef;
  constructor(private router:Router,private api:UnapprovedMissingAttendanceService,private monthandyear:MonthYearService,private modalService: BsModalService,public toastr: ToastrManager)
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
  }

  validateMissingAttendanceForm()
  {
    var start_date=moment(this.missingAttendanceData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.missingAttendanceData.end_date).format('DD/MM/YYYY');
    this.api.getUnapprovedMissingAttendance(start_date,end_date).subscribe(res => {
      this.api_data=res;
      this.missingattendanceData=this.api_data.attendance_missings_data;
      }, (err) => {
        alert(err.error);
        });

  }
  ngOnInit()
  {
    var start_date=moment(this.missingAttendanceData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.missingAttendanceData.end_date).format('DD/MM/YYYY');
    this.api.getUnapprovedMissingAttendance(start_date ,end_date).subscribe(res => {
      this.api_data=res;
      this.missingattendanceData=this.api_data.attendance_missings_data;
      this.missingAttendanceTableOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      this.missingAttendanceTableTrigger.next();
      }, (err) => {
        alert(err.error);
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
      this.showSuccess('Response Recorded');
      this.updateMissingAttendanceForm.reset();
      this.RefreshMissingAttendanceData();
      }, (err) => {
        this.showError(err.error);
        this.modalRef.hide();
        this.updateMissingAttendanceForm.reset();
        });
  }
  RefreshMissingAttendanceData()
  {
    var start_date=moment(this.missingAttendanceData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.missingAttendanceData.end_date).format('DD/MM/YYYY');
    this.api.getUnapprovedMissingAttendance(start_date,end_date).subscribe(res => {
      this.api_data=res;
      this.missingattendanceData=this.api_data.attendance_missings_data;
      }, (err) => {
        this.showError(err.error);
        });

  }
  showError(e,position: any = 'top-center') {
    this.toastr.errorToastr(e.message, 'Oops Some went wrong!',{  position: position});
  }
  showSuccess(message,position: any = 'top-center') {
    this.toastr.successToastr(message, 'Success',{  position: position});
  }

}
