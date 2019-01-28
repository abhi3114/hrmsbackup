import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../shared/service/notification.service';
import { UnapprovedLateMarksService } from './unapproved-late-marks.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import * as moment from 'moment';
@Component({
  selector: 'app-unapproved-late-marks',
  templateUrl: './unapproved-late-marks.component.html',
  styleUrls: ['./unapproved-late-marks.component.css']
  })
export class UnapprovedLateMarksComponent implements OnInit {
  isCollapsed = false;
  lateMarksForm: FormGroup;updateLateMarksForm:FormGroup;
  lateMarksData={start_date:'',end_date:''};updateLateMarksData={comment:'',id:''};
  api_data:any;latemarksData:any; showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  lateMarkTableOptions: DataTables.Settings = {};
  lateMarkTableTableTrigger: Subject<any> = new Subject();
  user_data:any; modalRef: BsModalRef;
  constructor(private router:Router,private api:UnapprovedLateMarksService,private monthandyear:MonthYearService,private modalService: BsModalService,public toastr: NotificationService)
  {
    var filteredData=monthandyear.getFilterData();
    this.lateMarksData.start_date = filteredData[0].firstDay;
    this.lateMarksData.end_date = filteredData[0].lastDay;
    this.lateMarksForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      });
    this.updateLateMarksForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
      });
    this.lateMarkTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }
  validateLateMarksForm()
  {
    var start_date=moment(this.lateMarksData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.lateMarksData.end_date).format('DD/MM/YYYY');
    this.api.getUnapprovedLateMarks(start_date,end_date).subscribe(res => {
      this.api_data=res;
      this.latemarksData=this.api_data.late_marks_data;
      this.rerender();
      }, (err) => {
        this.toastr.showError(err.error);
        });

  }
  ngOnInit()
  {
    var start_date=moment(this.lateMarksData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.lateMarksData.end_date).format('DD/MM/YYYY');
    this.api.getUnapprovedLateMarks(start_date ,end_date).subscribe(res => {
      this.api_data=res;
      this.latemarksData=this.api_data.late_marks_data;
      this.lateMarkTableTableTrigger.next();
      this.rerender();
      }, (err) => {
        this.toastr.showError(err.error);
        })
  }
  updateLateMarkResponse(template: TemplateRef<any>,lmId,lmreason)
  {
    this.modalRef = this.modalService.show(template);
    this.updateLateMarksData.comment=lmreason;
    this.updateLateMarksData.id=lmId
  }

  validateRecordLateMarkResponseForm()
  {
    this.api.recordLateMarkResponse(this.updateLateMarksData.id,this.updateLateMarksData).subscribe(res => {
      this.user_data=res;
      this.modalRef.hide();
      this.toastr.showSuccess('Response Recorded');
      this.updateLateMarksForm.reset();
      this.validateLateMarksForm();
      }, (err) => {
        this.toastr.showError(err.error);
        this.modalRef.hide();
        this.updateLateMarksForm.reset();
        });
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
