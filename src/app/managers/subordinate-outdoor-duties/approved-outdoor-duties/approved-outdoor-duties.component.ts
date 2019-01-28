import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit,ViewChild } from '@angular/core';
import {Observable,Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../../shared/service/notification.service';
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
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router,private api:ApprovedOutdoorDutyService,private monthandyear:MonthYearService, private notification:NotificationService) {
    var filteredData=monthandyear.getFilterData();
    this.approvedOutDoorDutyData.start_date = filteredData[0].firstDay;
    this.approvedOutDoorDutyData.end_date = filteredData[0].lastDay;
    this.approvedOutDoorDutyForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }

  validateApprovedOutDoorDutyForm(){
    var start_date=moment(this.approvedOutDoorDutyData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedOutDoorDutyData.end_date).format('DD/MM/YYYY');
    this.api.getallapprovedOutDoorDuties(start_date,end_date).subscribe(res => {
      this.approved_outdoor_duty_data=res;
      this.rerender();
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  ngOnInit() {
    var start_date=moment(this.approvedOutDoorDutyData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedOutDoorDutyData.end_date).format('DD/MM/YYYY');
    this.api.getallapprovedOutDoorDuties(start_date,end_date).subscribe(res => {
      this.approved_outdoor_duty_data=res;      
      this.leaveTableTrigger.next();
    }, (err) => {
      this.notification.showError(err.error);
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
