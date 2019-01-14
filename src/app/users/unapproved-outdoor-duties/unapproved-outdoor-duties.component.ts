import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnapprovedOutdoorDutiesService } from './unapproved-outdoor-duties.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import * as moment from 'moment';
@Component({
  selector: 'app-unapproved-outdoor-duties',
  templateUrl: './unapproved-outdoor-duties.component.html',
  styleUrls: ['./unapproved-outdoor-duties.component.css']
  })
export class UnapprovedOutdoorDutiesComponent implements OnInit {
  isCollapsed = false;
  outdoorDutiesForm: FormGroup;
  outdoorDutiesData={start_date:'',end_date:''};
  api_data:any;outdoordutiesData:any; showDataTable:Boolean;
  outdoorDutyTableOptions: DataTables.Settings = {};
  outdoorDutyTableTrigger: Subject<any> = new Subject();
  constructor(private router:Router,private api:UnapprovedOutdoorDutiesService,private monthandyear:MonthYearService)
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
    this.api.getUnapprovedOutdoorDuties(start_date,end_date).subscribe(res => {
      this.api_data=res;
      this.outdoordutiesData=this.api_data.outdoors_data;
      }, (err) => {
        alert(err.error);
        });

  }

  ngOnInit()
  {
    var start_date=moment(this.outdoorDutiesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.outdoorDutiesData.end_date).format('DD/MM/YYYY');
    this.api.getUnapprovedOutdoorDuties(start_date , end_date).subscribe(res => {
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

}
