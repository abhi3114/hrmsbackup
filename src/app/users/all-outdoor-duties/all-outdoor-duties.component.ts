import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { AllOutdoorDutiesService } from './all-outdoor-duties.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import * as moment from 'moment';
@Component({
  selector: 'app-all-outdoor-duties',
  templateUrl: './all-outdoor-duties.component.html',
  styleUrls: ['./all-outdoor-duties.component.css']
  })
export class AllOutdoorDutiesComponent implements OnInit {
  isCollapsed = false;
  outdoorDutiesForm: FormGroup;
  outdoorDutiesData={start_date:'',end_date:''};
  api_data:any;outdoordutiesData:any; showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  outdoorDutyTableOptions: DataTables.Settings = {};
  outdoorDutyTableTrigger: Subject<any> = new Subject();
  constructor(private router:Router,private api:AllOutdoorDutiesService,private monthandyear:MonthYearService)
  {
    var filteredData=monthandyear.getFilterData();
    this.outdoorDutiesData.start_date = filteredData[0].firstDay;
    this.outdoorDutiesData.end_date = filteredData[0].lastDay;
    this.outdoorDutiesForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      });
  }

  validateOutdoorDutiesForm()
  {
    var start_date=moment(this.outdoorDutiesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.outdoorDutiesData.end_date).format('DD/MM/YYYY');
    this.api.getAllOutdoorDuties(start_date,end_date).subscribe(res => {
      this.api_data=res;
      this.outdoordutiesData=this.api_data.outdoors_data;
      this.rerender();
      }, (err) => {
        alert(err.error);
        });

  }
  ngOnInit()
  {
    var start_date=moment(this.outdoorDutiesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.outdoorDutiesData.end_date).format('DD/MM/YYYY');
    this.api.getAllOutdoorDuties(start_date ,end_date).subscribe(res => {
      this.api_data=res;
      this.outdoordutiesData=this.api_data.outdoors_data;
      this.outdoorDutyTableOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      this.outdoorDutyTableTrigger.next();
      }, (err) => {
        alert(err.error);
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
