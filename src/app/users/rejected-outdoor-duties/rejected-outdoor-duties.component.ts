import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../shared/service/notification.service';
import { RejectedOutdoorDutiesService } from './rejected-outdoor-duties.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import * as moment from 'moment';

@Component({
  selector: 'app-rejected-outdoor-duties',
  templateUrl: './rejected-outdoor-duties.component.html',
  styleUrls: ['./rejected-outdoor-duties.component.css']
})
export class RejectedOutdoorDutiesComponent implements OnInit {

  isCollapsed = false; api_data:any;
  rejectedoutDoorDutiesForm: FormGroup;
  rejectedoutDoorDutiesData={start_date:'',end_date:''};
  rejectedoutDoorDuties:any; showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  outdoorDutyTableOptions: DataTables.Settings = {};
  outdoorDutyTableTrigger: Subject<any> = new Subject();
  user_data:any; modalRef: BsModalRef;

  constructor(private router:Router,private api:RejectedOutdoorDutiesService,private monthandyear:MonthYearService,private modalService: BsModalService,public toastr: NotificationService) {
    var filteredData=monthandyear.getFilterData();
    this.rejectedoutDoorDutiesData.start_date = filteredData[0].firstDay;
    this.rejectedoutDoorDutiesData.end_date = filteredData[0].lastDay;
    this.rejectedoutDoorDutiesForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
    this.outdoorDutyTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
   }

  ngOnInit() {
    var start_date=moment(this.rejectedoutDoorDutiesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.rejectedoutDoorDutiesData.end_date).format('DD/MM/YYYY');
    this.api.getAllRejectedOutDoorDuties(start_date ,end_date).subscribe(res => {
      this.api_data=res;
      this.rejectedoutDoorDuties=this.api_data.rejected_outdoorduties_data;
      this.outdoorDutyTableTrigger.next();
      }, (err) => {
      this.toastr.showError(err.error);
    })
  }

  getFilteredRejectedOutDoorDuties(){
    var start_date=moment(this.rejectedoutDoorDutiesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.rejectedoutDoorDutiesData.end_date).format('DD/MM/YYYY');
    this.api.getAllRejectedOutDoorDuties(start_date ,end_date).subscribe(res => {
      this.api_data=res;
      this.rejectedoutDoorDuties=this.api_data.rejected_outdoorduties_data;
      this.rerender();
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
