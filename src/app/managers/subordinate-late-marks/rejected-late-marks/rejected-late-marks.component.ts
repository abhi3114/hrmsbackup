import { Component, OnInit,ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RejectedLateMarksService } from './rejected-late-marks.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NotificationService } from '../../../shared/service/notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-rejected-late-marks',
  templateUrl: './rejected-late-marks.component.html',
  styleUrls: ['./rejected-late-marks.component.css']
})
export class RejectedLateMarksComponent implements OnInit {

  isCollapsed = false;
  rejectedLateMarkForm: FormGroup;
  rejectedLateMarkFormData={start_date:'',end_date:''};
  rejected_late_mark_data:any; showDataTable:Boolean;
  user_rejected_late_mark_data:any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  modalRef: BsModalRef;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router,private api:RejectedLateMarksService,private monthandyear:MonthYearService, private notification: NotificationService, private modalService: BsModalService) {
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
    var filteredData=monthandyear.getFilterData();
    this.rejectedLateMarkFormData.start_date = filteredData[0].firstDay;
    this.rejectedLateMarkFormData.end_date = filteredData[0].lastDay;
    this.rejectedLateMarkForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    var start_date=moment(this.rejectedLateMarkFormData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.rejectedLateMarkFormData.end_date).format('DD/MM/YYYY');
    this.api.getallRejectedSubordinateLateMarks(start_date,end_date).subscribe(res => {
      this.rejected_late_mark_data=res;
      this.leaveTableTrigger.next();
      }, (err) => {
        this.notification.showError(err.error);
    });
  }
  filterSubOrdinateLateMark(){
    var start_date=moment(this.rejectedLateMarkFormData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.rejectedLateMarkFormData.end_date).format('DD/MM/YYYY');
    this.api.getallRejectedSubordinateLateMarks(start_date,end_date).subscribe(res => {
      this.rejected_late_mark_data=res;
      this.rerender();
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  userLateMarkList(template: TemplateRef<any>, l)
  {
    this.modalRef = this.modalService.show(template);
    var start_date=moment(this.rejectedLateMarkFormData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.rejectedLateMarkFormData.end_date).format('DD/MM/YYYY');
    var user_id = l.user_id
    this.api.getAllRejectedSubordinateSpecificLateMarks(start_date,end_date, user_id).subscribe(res => {
      this.user_rejected_late_mark_data=res;
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
