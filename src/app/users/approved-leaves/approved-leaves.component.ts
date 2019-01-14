import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApprovedLeavesService } from './approved-leaves.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import * as moment from 'moment';
@Component({
  selector: 'app-approved-leaves',
  templateUrl: './approved-leaves.component.html',
  styleUrls: ['./approved-leaves.component.css']
  })
export class ApprovedLeavesComponent implements OnInit {
  isCollapsed = false;
  allLeavesForm: FormGroup;
  allLeavesData={start_date:'',end_date:''};
  leaves_data:any;leavesData:any; showDataTable:Boolean;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();
  constructor(private router:Router,private api:ApprovedLeavesService,private monthandyear:MonthYearService)
  {
    var filteredData=monthandyear.getFilterData();
    this.allLeavesData.start_date = filteredData[0].firstDay;
    this.allLeavesData.end_date = filteredData[0].lastDay;
    this.allLeavesForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      });
  }

  validateAllLeavesForm()
  {
    var start_date=moment(this.allLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.allLeavesData.end_date).format('DD/MM/YYYY');

    this.api.getApprovedLeaves(start_date,end_date).subscribe(res => {
      this.leaves_data=res;
      this.leavesData=this.leaves_data.leaves_data;
      }, (err) => {
        alert(err.error);
        });

  }

  ngOnInit()
  {
    var start_date=moment(this.allLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.allLeavesData.end_date).format('DD/MM/YYYY');

    this.api.getApprovedLeaves(start_date,end_date).subscribe(res => {
      this.leaves_data=res;
      this.leavesData=this.leaves_data.leaves_data;
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
