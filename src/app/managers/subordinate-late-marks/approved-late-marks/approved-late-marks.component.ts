import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../../shared/service/notification.service';
import { ApprovedLateMarksService } from './approved-late-marks.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import * as moment from 'moment';

@Component({
  selector: 'app-approved-late-marks',
  templateUrl: './approved-late-marks.component.html',
  styleUrls: ['./approved-late-marks.component.css']
})
export class ApprovedLateMarksComponent implements OnInit {

  isCollapsed = false;
  approvedLateMarksForm: FormGroup;
  approvedLateMarkData={start_date:'',end_date:''};
  approved_late_mark_data:any; showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  leaveTableOptions: DataTables.Settings = {};
  modalRef: BsModalRef;
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router,private api:ApprovedLateMarksService,private monthandyear:MonthYearService, private notification: NotificationService, private modalService: BsModalService) {
    var filteredData=monthandyear.getFilterData();
    this.approvedLateMarkData.start_date = filteredData[0].firstDay;
    this.approvedLateMarkData.end_date = filteredData[0].lastDay;
    this.approvedLateMarksForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }

  validateApprovedLateMarksForm(){
    var start_date=moment(this.approvedLateMarkData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedLateMarkData.end_date).format('DD/MM/YYYY');
    this.api.getAllApprovedSubordinateLateMarks(start_date,end_date).subscribe(res => {
      this.approved_late_mark_data=res;
      this.rerender();
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  ngOnInit() {
    var start_date=moment(this.approvedLateMarkData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedLateMarkData.end_date).format('DD/MM/YYYY');
    this.api.getAllApprovedSubordinateLateMarks(start_date,end_date).subscribe(res => {
      this.approved_late_mark_data=res;
      this.leaveTableTrigger.next();
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  userLateMarkList(template: TemplateRef<any>, l)
  {
    this.modalRef = this.modalService.show(template);
    var start_date=moment(this.approvedLateMarkData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.approvedLateMarkData.end_date).format('DD/MM/YYYY');
    var user_id = l.user_id
    this.api.getAllApprovedSpecificSubordinateLateMarks(start_date,end_date, user_id).subscribe(res => {
      this.approved_late_mark_data=res;
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
