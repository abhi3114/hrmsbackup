import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { UnapprovedOutdoorDutiesService } from './unapproved-outdoor-duties.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import { NotificationService } from '../../../shared/service/notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-unapproved-outdoor-duties',
  templateUrl: './unapproved-outdoor-duties.component.html',
  styleUrls: ['./unapproved-outdoor-duties.component.css']
  })
export class UnapprovedOutdoorDutiesComponent implements OnInit {

  isCollapsed = false;
  unapproved_outdoor_duty_data:any; showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();
  unapprovedOutdoorForm: FormGroup;
  unapprovedOutdoorFormData={start_date:'',end_date:''};

  constructor(private router:Router, private notification:NotificationService, private api:UnapprovedOutdoorDutiesService,private monthandyear:MonthYearService)
  {
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
    var filteredData=monthandyear.getFilterData();
    this.unapprovedOutdoorFormData.start_date = filteredData[0].firstDay;
    this.unapprovedOutdoorFormData.end_date = filteredData[0].lastDay;
    this.unapprovedOutdoorForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    var start_date=moment(this.unapprovedOutdoorFormData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedOutdoorFormData.end_date).format('DD/MM/YYYY');
    this.api.getAllUnapprovedOutDoorDuties(start_date,end_date).subscribe(res => {
      this.unapproved_outdoor_duty_data=res;
      this.leaveTableTrigger.next();
      }, (err) => {
        this.notification.showError(err.error);
        });
  }

  filterSubOrdinateOutdoor(){
    var start_date=moment(this.unapprovedOutdoorFormData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedOutdoorFormData.end_date).format('DD/MM/YYYY');
    this.api.getAllUnapprovedOutDoorDuties(start_date,end_date).subscribe(res => {
      this.unapproved_outdoor_duty_data=res;
      this.rerender();
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  checkAll(){
    if ($('.check-box:checked').length > 0)
    $('.checkbox').prop('checked', true);
    else
    $('.checkbox').prop('checked', false);
  }

  save(){
    var unapproved_outdoor_ids = []
    $('.checkbox:checked').each(function() {
      var id = $(this).attr('name');
      unapproved_outdoor_ids.push(id);
      });
    var postdata = { "outdoor_ids":  unapproved_outdoor_ids}
    if(unapproved_outdoor_ids != undefined && unapproved_outdoor_ids.length > 0)
    {
      this.api.sendForOutDoorDutiesApproval(postdata).subscribe(res => {
        unapproved_outdoor_ids = [];
        this.notification.showSuccess('OutDoor Duty approved successfully');
        this.getallODS();
        }, (err) => {
          this.notification.showError(err.error);
          });
    }
    else
    {
      this.notification.CustomErrorMessage('Please check atleast one outdoor duty');
    }
  }

  getallODS()
  {
    var start_date=moment(this.unapprovedOutdoorFormData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedOutdoorFormData.end_date).format('DD/MM/YYYY');
    this.api.getAllUnapprovedOutDoorDuties(start_date,end_date).subscribe(res => {
      this.unapproved_outdoor_duty_data=res;
      $('.check-box').prop('checked', false);
      this.rerender();
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
