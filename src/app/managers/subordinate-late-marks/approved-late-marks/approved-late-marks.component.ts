import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { ApprovedLateMarksService } from './approved-late-marks.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import * as moment from 'moment';

@Component({
  selector: 'app-approved-late-marks',
  templateUrl: './approved-late-marks.component.html',
  styleUrls: ['./approved-late-marks.component.css']
})
export class ApprovedLateMarksComponent implements OnInit {

  isCollapsed = false;
  approvedLateMarksForm: FormGroup;
  approvedLateMarkData={start_date:'',end_date:''};
  approved_late_mark_data:any; showDataTable:Boolean;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router,private api:ApprovedLateMarksService,private monthandyear:MonthYearService) {
    var filteredData=monthandyear.getFilterData();
    this.approvedLateMarkData.start_date = filteredData[0].firstDay;
    this.approvedLateMarkData.end_date = filteredData[0].lastDay;
    this.approvedLateMarksForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
  }

  validateApprovedLateMarksForm(){
    var start_date=moment(this.approvedLateMarkData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedLateMarkData.end_date).format('DD/MM/YYYY');
    this.api.getAllApprovedSubordinateLateMarks(start_date,end_date).subscribe(res => {
      this.approved_late_mark_data=res;
      }, (err) => {
        alert(err.error);
    });
  }

  ngOnInit() {
    var start_date=moment(this.approvedLateMarkData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedLateMarkData.end_date).format('DD/MM/YYYY');
    this.api.getAllApprovedSubordinateLateMarks(start_date,end_date).subscribe(res => {
      this.approved_late_mark_data=res;
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
