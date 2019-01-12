import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  missingAttendanceForm: FormGroup;
  missingAttendanceData={start_date:'',end_date:''};
  api_data:any;missingattendanceData:any; showDataTable:Boolean;
  missingAttendanceTableOptions: DataTables.Settings = {};
  missingAttendanceTableTrigger: Subject<any> = new Subject();
  constructor(private router:Router,private api:AllMissingAttendanceService,private monthandyear:MonthYearService)
  {
    var filteredData=monthandyear.getFilterData();
    this.missingAttendanceData.start_date = filteredData[0].firstDay;
    this.missingAttendanceData.end_date = filteredData[0].lastDay;
    this.missingAttendanceForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      });
  }

  validateMissingAttendanceForm()
  {
    var start_date=moment(this.missingAttendanceData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.missingAttendanceData.end_date).format('DD/MM/YYYY');
    this.api.getAllMissingAttendance(start_date,end_date).subscribe(res => {
      this.api_data=res;
      this.missingattendanceData=this.api_data.attendance_missing_data;
      }, (err) => {
        alert(err.error);
        });

  }
  ngOnInit()
  {
    var start_date=moment(this.missingAttendanceData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.missingAttendanceData.end_date).format('DD/MM/YYYY');
    this.api.getAllMissingAttendance(start_date ,end_date).subscribe(res => {
      this.api_data=res;
      this.missingattendanceData=this.api_data.attendance_missing_data;
      this.missingAttendanceTableOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      this.missingAttendanceTableTrigger.next();
      }, (err) => {
        alert(err.error);
        })
  }

}
