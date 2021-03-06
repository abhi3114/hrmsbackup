import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../shared/service/notification.service';
import { ApprovedOutdoorDutiesService } from './approved-outdoor-duties.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import * as moment from 'moment';
@Component({
  selector: 'app-approved-outdoor-duties',
  templateUrl: './approved-outdoor-duties.component.html',
  styleUrls: ['./approved-outdoor-duties.component.css']
  })
export class ApprovedOutdoorDutiesComponent implements OnInit {
  isCollapsed = false;
  outdoorDutiesForm: FormGroup;
  outdoorDutiesData={start_date:'',end_date:''};
  api_data:any;outdoordutiesData:any; showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  outdoorDutyTableOptions: DataTables.Settings = {};
  outdoorDutyTableTrigger: Subject<any> = new Subject();
  constructor(private router:Router,private api:ApprovedOutdoorDutiesService,private monthandyear:MonthYearService,public toastr: NotificationService)
  {
    var filteredData=monthandyear.getFilterData();
    this.outdoorDutiesData.start_date = filteredData[0].firstDay;
    this.outdoorDutiesData.end_date = filteredData[0].lastDay;
    this.outdoorDutiesForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      });
    this.outdoorDutyTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }
  validateOutdoorDutiesForm()
  {
    var start_date=moment(this.outdoorDutiesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.outdoorDutiesData.end_date).format('DD/MM/YYYY');
    this.api.getApprovedOutdoorDuties(start_date,end_date).subscribe(res => {
      this.api_data=res;
      this.outdoordutiesData=this.api_data.outdoors_data;
      this.rerender();
      }, (err) => {
        this.toastr.showError(err.error);
        });

  }
  ngOnInit()
  {
    var start_date=moment(this.outdoorDutiesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.outdoorDutiesData.end_date).format('DD/MM/YYYY');
    this.api.getApprovedOutdoorDuties(start_date,end_date).subscribe(res => {
      this.api_data=res;
      this.outdoordutiesData=this.api_data.outdoors_data;
      this.outdoorDutyTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        })
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.outdoorDutyTableTrigger.next();
      });

  }

}
