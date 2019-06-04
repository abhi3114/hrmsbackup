import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../shared/service/notification.service';
import { RejectedMissingAttendancesService } from './rejected-missing-attendances.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import * as moment from 'moment';

@Component({
  selector: 'app-rejected-missing-attendances',
  templateUrl: './rejected-missing-attendances.component.html',
  styleUrls: ['./rejected-missing-attendances.component.css']
})
export class RejectedMissingAttendancesComponent implements OnInit {

  isCollapsed = false; api_data:any;
  rejectedMissingAttendancesForm: FormGroup;
  rejectedMissingAttendancesData={start_date:'',end_date:''};
  rejectedMissingAttendances:any; showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  lateMarkTableOptions: DataTables.Settings = {};
  lateMarkTableTableTrigger: Subject<any> = new Subject();
  user_data:any; modalRef: BsModalRef;

  constructor(private router:Router,private api:RejectedMissingAttendancesService,private monthandyear:MonthYearService,private modalService: BsModalService,public toastr: NotificationService){
    var filteredData=monthandyear.getFilterData();
    this.rejectedMissingAttendancesData.start_date = filteredData[0].firstDay;
    this.rejectedMissingAttendancesData.end_date = filteredData[0].lastDay;
    this.rejectedMissingAttendancesForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
    this.lateMarkTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }

  ngOnInit() {
    var start_date=moment(this.rejectedMissingAttendancesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.rejectedMissingAttendancesData.end_date).format('DD/MM/YYYY');
    this.api.getAllRejectedMissingAttendances(start_date ,end_date).subscribe(res => {
      this.api_data=res;
      this.rejectedMissingAttendances=this.api_data.attendance_missings_data;
      this.lateMarkTableTableTrigger.next();
      }, (err) => {
      this.toastr.showError(err.error);
    })
  }

  getFilteredRejectedMissingAttendances(){
    var start_date=moment(this.rejectedMissingAttendancesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.rejectedMissingAttendancesData.end_date).format('DD/MM/YYYY');
    this.api.getAllRejectedMissingAttendances(start_date ,end_date).subscribe(res => {
      this.api_data=res;
      this.rejectedMissingAttendances=this.api_data.attendance_missings_data;
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
      this.lateMarkTableTableTrigger.next();
      });
  }

}
