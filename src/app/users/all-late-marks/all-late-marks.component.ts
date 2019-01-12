import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllLateMarksService } from './all-late-marks.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import * as moment from 'moment';
@Component({
  selector: 'app-all-late-marks',
  templateUrl: './all-late-marks.component.html',
  styleUrls: ['./all-late-marks.component.css']
  })
export class AllLateMarksComponent implements OnInit {
  isCollapsed = false;
  lateMarksForm: FormGroup;
  lateMarksData={start_date:'',end_date:''};
  api_data:any;latemarksData:any; showDataTable:Boolean;
  lateMarkTableOptions: DataTables.Settings = {};
  lateMarkTableTableTrigger: Subject<any> = new Subject();
  constructor(private router:Router,private api:AllLateMarksService,private monthandyear:MonthYearService)
  {
    var filteredData=monthandyear.getFilterData();
    this.lateMarksData.start_date = filteredData[0].firstDay;
    this.lateMarksData.end_date = filteredData[0].lastDay;
    this.lateMarksForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      });
  }

  validateLateMarksForm()
  {
    var start_date=moment(this.lateMarksData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.lateMarksData.end_date).format('DD/MM/YYYY');
    this.api.getAllLateMarks(start_date,end_date).subscribe(res => {
      this.api_data=res;
      this.latemarksData=this.api_data.late_marks_data;
      }, (err) => {
        alert(err.error);
        });

  }
  ngOnInit()
  {
    var start_date=moment(this.lateMarksData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.lateMarksData.end_date).format('DD/MM/YYYY');
    this.api.getAllLateMarks(start_date ,end_date).subscribe(res => {
      this.api_data=res;
      this.latemarksData=this.api_data.late_marks_data;
      this.lateMarkTableOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      this.lateMarkTableTableTrigger.next();
      }, (err) => {
        alert(err.error);
        })
  }

}
