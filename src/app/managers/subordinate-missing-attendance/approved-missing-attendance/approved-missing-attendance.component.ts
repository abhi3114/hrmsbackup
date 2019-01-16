import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { ApprovedMissingAttendanceService } from './approved-missing-attendance.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import * as moment from 'moment';

@Component({
  selector: 'app-approved-missing-attendance',
  templateUrl: './approved-missing-attendance.component.html',
  styleUrls: ['./approved-missing-attendance.component.css']
})
export class ApprovedMissingAttendanceComponent implements OnInit {

  isCollapsed = false;
  approvedMissingAttendanceForm: FormGroup;
  approvedMissingAttendanceData={start_date:'',end_date:''};
  approved_missing_attendances_data:any;showDataTable:Boolean;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router,private api:ApprovedMissingAttendanceService,private monthandyear:MonthYearService) {
    var filteredData=monthandyear.getFilterData();
    this.approvedMissingAttendanceData.start_date = filteredData[0].firstDay;
    this.approvedMissingAttendanceData.end_date = filteredData[0].lastDay;
    this.approvedMissingAttendanceForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
  }

  validateApprovedMissingAttendanceForm(){
    var start_date=moment(this.approvedMissingAttendanceData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedMissingAttendanceData.end_date).format('DD/MM/YYYY');
    this.api.getallapprovedMissingAttendances(start_date,end_date).subscribe(res => {
      this.approved_missing_attendances_data=res;
      }, (err) => {
        alert(err.error);
    });
  }

  ngOnInit() {
    var start_date=moment(this.approvedMissingAttendanceData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedMissingAttendanceData.end_date).format('DD/MM/YYYY');
    this.api.getallapprovedMissingAttendances(start_date,end_date).subscribe(res => {
      this.approved_missing_attendances_data=res;
      this.leaveTableOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      this.leaveTableTrigger.next();
      }, (err) => {
      alert(err.error);
    });
  }

}
