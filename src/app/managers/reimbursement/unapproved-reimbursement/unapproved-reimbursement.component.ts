import { Component, OnInit,TemplateRef} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { unApprovedReimbursementService } from './unapproved-reimbursement.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import { CommonSalaryService } from '../../../shared/service/common-salary.service';
import {Observable,Subject} from 'rxjs';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-unapproved-reimbursement',
  templateUrl: './unapproved-reimbursement.component.html',
  styleUrls: ['./unapproved-reimbursement.component.css']
})
export class UnapprovedReimbursementComponent implements OnInit
{

  rembursement_api_data:any=[];
  user_unapproved_reimbursement_data:any[];
  single_user_data:any[];
  unapprovedreimbursementform:FormGroup;
  approverejectreimbursementform:FormGroup;
  monoUnapprovedReimbursementform:FormGroup;
  monthArray:any;yearArray:any;filteredData:any;
  unapproved_filter={selectedmonth:'',selectedyear:''};
  user_id:any;
  month:any;
  year:any;
 reimbursementunapprovedTableOptions: DataTables.Settings = {};
 reimbursementunapprovedTableTrigger: Subject<any> = new Subject();
 modalRef: BsModalRef;
 modalRefchild: BsModalRef;
 splitmonthyear:any=[];

  constructor(private api:unApprovedReimbursementService,public toastr: NotificationService,private modalService: BsModalService,private monthandyear:MonthYearService,private currentmonthandyear:CommonSalaryService) 
  {
    this.unapprovedreimbursementform = new FormGroup({
      month: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
    });
    this.approverejectreimbursementform = new FormGroup({
      comment: new FormControl('', [Validators.required])
    });
    this.monoUnapprovedReimbursementform = new FormGroup({
      comment: new FormControl('', [Validators.required])
    });

    this.monthArray=this.monthandyear.populateMonth();
    this.yearArray=this.monthandyear.populateYear();
    this.filteredData=this.currentmonthandyear.getMonthandYear();
    this.unapproved_filter.selectedmonth=this.filteredData.selectedmonth;
    this.unapproved_filter.selectedyear= this.filteredData.selectedyear;


    this.getfilterData();
  }

  ngOnInit()
  {}

  getfilterData()
  {
    var year;var month;
    $('#UnapprovedRembursementDataTables').DataTable().destroy();
    this.unapprovedreimbursementform.controls.year.value == "" ? year = this.unapproved_filter.selectedyear : year =
    this.unapprovedreimbursementform.controls.year.value
    this.unapprovedreimbursementform.controls.month.value == "" ? month = this.unapproved_filter.selectedmonth : month =
    this.unapprovedreimbursementform.controls.month.value
    this.api.getUnapprovedService(year,month).subscribe((res:any) => {
     this.rembursement_api_data=res;
      this.reimbursementunapprovedTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });
  }

  approveallreimbursement()
  {
    if(confirm("Are you sure to Approve this Bulk reimbursement "))
    {
        var approvecheckstore = [];
        $('.checkbox:checked').each(function()
        {
          var id = $(this).attr('name');
          approvecheckstore.push(id);
        });
        var postdata = { "reimbursement_ids":  approvecheckstore, reason: this.approverejectreimbursementform.controls.comment.value}
        console.log(this.approverejectreimbursementform.controls.comment.value)
        if(approvecheckstore != undefined && approvecheckstore.length > 0)
        {
          this.api.sendForBulkReimbursementApproval(postdata).subscribe(res => {
          approvecheckstore = [];
          this.getfilterData()
          this.refreshReimbursementData()
          this.toastr.showSuccess('Reimbursement approved successfully');
          this.approverejectreimbursementform.reset();
          }, (err) => {
          this.toastr.showError(err.error);
          });
        }
        else
        {
          this.toastr.CustomErrorMessage('Please check atleast one Reimbursement');
        }
    }
  }

  rejectallreimbursement()
  {
    if(confirm("Are you sure to Reject this Bulk reimbursement "))
    {
      var rejectcheckstore = [];
      $('.checkbox:checked').each(function()
      {
        var id = $(this).attr('name');
        rejectcheckstore.push(id);
      });
      var postdata = { "reimbursement_ids":  rejectcheckstore, reason: this.approverejectreimbursementform.controls.comment.value}
        if(rejectcheckstore != undefined && rejectcheckstore.length > 0)
        {
          this.api.sendForBulkReimbursementRejected(postdata).subscribe(res => {
          rejectcheckstore = [];
          this.toastr.showSuccess('Reimbursement Rejected successfully');
          this.getfilterData()
          this.refreshReimbursementData()
          this.approverejectreimbursementform.reset();
          }, (err) => {
          this.toastr.showError(err.error);
          });
        }
        else
        {
          this.toastr.CustomErrorMessage('Please check atleast one Reimbursement');
        }
    }
  }
  userrembursementList(template: TemplateRef<any>, r)
  {
      this.modalRef = this.modalService.show(template);
      this.user_id=r.user_id;
      this.unapprovedreimbursementform.controls.year.value == "" ? this.year = this.unapproved_filter.selectedyear : this.year =
      this.unapprovedreimbursementform.controls.year.value
      this.unapprovedreimbursementform.controls.month.value == "" ? this.month = this.unapproved_filter.selectedmonth : this.month =
      this.unapprovedreimbursementform.controls.month.value

      this.api.getUserUnapprovedData(this.year,this.month, this.user_id).subscribe((res:any) => {
      this.user_unapproved_reimbursement_data=res.reimbursements;
      console.log(res.reimbursements)
       }, (err) => {
         this.toastr.showError(err.error);
       });
  }

  approveSinglereimbursement(r)
  {
    if(confirm("Are you sure to Approve this reimbursement "))
    {
        var reason = this.monoUnapprovedReimbursementform.controls.comment.value
        this.api.sendForSingleReimbursementApproval(r,reason).subscribe(res => {
        this.getfilterData()
        this.refreshReimbursementData()
        this.modalRefchild.hide();
        this.monoUnapprovedReimbursementform.reset();
        this.toastr.showSuccess('Reimbursement Approved successfully');
        }, (err) => {
        this.monoUnapprovedReimbursementform.reset();
        this.toastr.showError(err.error);
        this.modalRefchild.hide();
        });
    }
  }

  rejectSinglereimbursement(r)
  {
    if(confirm("Are you sure to Reject this reimbursement "))
    {
      var reason = this.monoUnapprovedReimbursementform.controls.comment.value
      this.api.sendForSingleReimbursementRejection(r, reason).subscribe(res => {
      this.getfilterData()
      this.refreshReimbursementData()
      this.modalRefchild.hide();
      this.monoUnapprovedReimbursementform.reset();
      this.toastr.showSuccess('Reimbursement Rejected successfully');
      }, (err) => {
      this.toastr.showError(err.error);
      this.modalRefchild.hide();
      this.monoUnapprovedReimbursementform.reset();
      });
    }
  }

  unapproveviewreimbursement(template: TemplateRef<any>, r)
  {
    this.modalRefchild = this.modalService.show(template);
    this.single_user_data=r;
    var spiltmonthandyear=(r.display_month_year).split('-');
    this.splitmonthyear=spiltmonthandyear;
  }

  refreshReimbursementData()
  {
    this.api.getUserUnapprovedData(this.year,this.month, this.user_id).subscribe((res:any) => {
    this.user_unapproved_reimbursement_data=res.reimbursements;
    }, (err) => {
    this.toastr.showError(err.error);
    });
  }

}
