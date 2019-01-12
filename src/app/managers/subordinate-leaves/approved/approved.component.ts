import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Observable,Subject} from 'rxjs';
import { ApprovedService } from './approved.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import * as moment from 'moment';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {

  isCollapsed = false;
  approvedLeavesForm: FormGroup;
  approvedLeavesData={start_date:'',end_date:''};
  approved_leaves_data:any;approvedleavesData:any; showDataTable:Boolean;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router,private api:ApprovedService,private monthandyear:MonthYearService) {
    var filteredData=monthandyear.getFilterData();
    this.approvedLeavesData.start_date = filteredData[0].firstDay;
    this.approvedLeavesData.end_date = filteredData[0].lastDay;
    this.approvedLeavesForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
  }

  validateApprovedLeavesForm(){
    var start_date=moment(this.approvedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getallapprovedSubordinateLeave(start_date,end_date).subscribe(res => {
      this.approved_leaves_data=res;
      this.approvedLeavesData=this.approved_leaves_data.approved_leaves_data;
      }, (err) => {
        alert(err.error);
    });
  }

  ngOnInit() {
    var start_date=moment(this.approvedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getallapprovedSubordinateLeave(start_date,end_date).subscribe(res => {
      this.approved_leaves_data=res;
      this.approvedLeavesData=this.approved_leaves_data;
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
