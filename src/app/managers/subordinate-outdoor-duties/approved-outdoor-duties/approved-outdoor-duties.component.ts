import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Observable,Subject} from 'rxjs';
import { ApprovedOutdoorDutyService } from './approved-outdoor-duty.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import * as moment from 'moment';

@Component({
  selector: 'app-approved-outdoor-duties',
  templateUrl: './approved-outdoor-duties.component.html',
  styleUrls: ['./approved-outdoor-duties.component.css']
})
export class ApprovedOutdoorDutiesComponent implements OnInit {

  isCollapsed = false;
  approvedOutDoorDutyForm: FormGroup;
  approvedOutDoorDutyData={start_date:'',end_date:''};
  approved_outdoor_duty_data:any;approvedoutdoordutydata:any; showDataTable:Boolean;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router,private api:ApprovedOutdoorDutyService,private monthandyear:MonthYearService) {
    var filteredData=monthandyear.getFilterData();
    this.approvedOutDoorDutyData.start_date = filteredData[0].firstDay;
    this.approvedOutDoorDutyData.end_date = filteredData[0].lastDay;
    this.approvedOutDoorDutyForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
  }

  validateApprovedOutDoorDutyForm(){
    var start_date=moment(this.approvedOutDoorDutyData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedOutDoorDutyData.end_date).format('DD/MM/YYYY');
    this.api.getallapprovedOutDoorDuties(start_date,end_date).subscribe(res => {
      this.approved_outdoor_duty_data=res;
      }, (err) => {
        alert(err.error);
    });
  }

  ngOnInit() {
    var start_date=moment(this.approvedOutDoorDutyData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedOutDoorDutyData.end_date).format('DD/MM/YYYY');
    this.api.getallapprovedOutDoorDuties(start_date,end_date).subscribe(res => {
      this.approved_outdoor_duty_data=res;
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
