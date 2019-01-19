import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../shared/service/notification.service'
import { UnapprovedLeavesService } from './unapproved-leaves.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import * as moment from 'moment';
@Component({
  selector: 'app-unapproved-leaves',
  templateUrl: './unapproved-leaves.component.html',
  styleUrls: ['./unapproved-leaves.component.css']
  })
export class UnapprovedLeavesComponent implements OnInit {
  isCollapsed = false;
  allLeavesForm: FormGroup;
  allLeavesData={start_date:'',end_date:''};
  leaves_data:any;leavesData:any; showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();
  constructor(private router:Router,private api:UnapprovedLeavesService,private monthandyear:MonthYearService,public toastr: NotificationService)
  {
    var filteredData=monthandyear.getFilterData();
    this.allLeavesData.start_date = filteredData[0].firstDay;
    this.allLeavesData.end_date = filteredData[0].lastDay;
    this.allLeavesForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      });
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }
  validateAllLeavesForm()
  {
    var start_date=moment(this.allLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.allLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getUnapprovedLeaves(start_date,end_date).subscribe(res => {
      this.leaves_data=res;
      this.leavesData=this.leaves_data.leaves_data;
      this.rerender();
      }, (err) => {
        this.toastr.showError(err.error);
        });

  }


  ngOnInit()
  {
    var start_date=moment(this.allLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.allLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getUnapprovedLeaves(start_date,end_date).subscribe(res => {
      this.leaves_data=res;
      this.leavesData=this.leaves_data.leaves_data;
      this.leaveTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.leaveTableTrigger.next();
      });
  }

}
