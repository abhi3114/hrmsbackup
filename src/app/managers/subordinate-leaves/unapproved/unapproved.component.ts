import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import {Observable, Subject } from 'rxjs'
import {UnapprovedService} from './unapproved.service'
import { MonthYearService } from '../../../shared/service/month-year.service';
import * as moment from 'moment';


@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.component.html',
  styleUrls: ['./unapproved.component.css']
})
export class UnapprovedComponent implements OnInit {

  isCollapsed = false;
  unapprovedLeavesForm: FormGroup;
  unapprovedLeavesData={start_date:'',end_date:''};
  unapproved_leaves_data:any;unapprovedleavesData:any; showDataTable:Boolean;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router, private api:UnapprovedService, private my:MonthYearService) {
    var filteredData=my.getFilterData();
    this.unapprovedLeavesData.start_date = filteredData[0].firstDay;
    this.unapprovedLeavesData.end_date = filteredData[0].lastDay;
    this.unapprovedLeavesForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
  }

  validateApprovedLeavesForm(){
    var start_date=moment(this.unapprovedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getAllUnapprovedSubordinateLeave(start_date,end_date).subscribe(res => {
      this.unapproved_leaves_data=res;
      }, (err) => {
        alert(err.error);
    });
  }

  ngOnInit() {
    var start_date=moment(this.unapprovedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getAllUnapprovedSubordinateLeave(start_date,end_date).subscribe(res => {
      this.unapproved_leaves_data=res;
      this.leaveTableOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      this.leaveTableTrigger.next();
      }, (err) => {
      alert(err.error);
    });
  }

  checkALL(){
    if ($('.check-box:checked').length > 0)
      $('.checkbox').prop('checked', true);
    else
      $('.checkbox').prop('checked', false);
  }

  save(){
  }

}
