import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllLeavesService } from './all-leaves.service';
import { MonthYearService } from '../../shared/service/month-year.service';
@Component({
  selector: 'app-all-leaves',
  templateUrl: './all-leaves.component.html',
  styleUrls: ['./all-leaves.component.css']
  })
export class AllLeavesComponent implements OnInit {
  isCollapsed = false;
  allLeavesForm: FormGroup;
  allLeavesData={start_date:'',end_date:''};
  leaves_data:any;leavesData:any; showDataTable:Boolean;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();
  constructor(private router:Router,private api:AllLeavesService,private monthandyear:MonthYearService)
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
    this.api.getAllLeaves(this.allLeavesData.start_date,this.allLeavesData.end_date).subscribe(res => {
      this.leaves_data=res;
      this.leavesData=this.leaves_data.leaves_data;
      }, (err) => {
        alert(err.error);
        });

  }


  ngOnInit()
  {
    this.api.getAllLeaves(this.allLeavesData.start_date , this.allLeavesData.end_date).subscribe(res => {
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
