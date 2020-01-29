import { Component, OnInit,TemplateRef} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import{ unApprovedReimbursementService } from './unapproved-reimbursement.service';
import { NotificationService } from '../../../shared/service/notification.service';
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
  currentmonth=moment().format('MMMM');
  cmonth=moment().month(this.currentmonth).format("M");
  currentyear=moment().format('YYYY');
  months=[{"month_id":1,"month_name":'January'},
          {"month_id":2,"month_name":'February'},
          {"month_id":3,"month_name":'March'},
          {"month_id":4,"month_name":'April'},
          {"month_id":5,"month_name":'May'},
          {"month_id":6,"month_name":'June'},
          {"month_id":7,"month_name":'July'},
          {"month_id":8,"month_name":'August'},
          {"month_id":9,"month_name":'September'},
          {"month_id":10,"month_name":'October'},
          {"month_id":11,"month_name":'November'},
          {"month_id":12,"month_name":'December'}
          ];
 years=[2020,2019,2018,2017];
 reimbursementunapprovedTableOptions: DataTables.Settings = {};
 reimbursementunapprovedTableTrigger: Subject<any> = new Subject();
 modalRef: BsModalRef;
 modalRefchild: BsModalRef;
 splitmonthyear:any=[];

  constructor(private api:unApprovedReimbursementService,public toastr: NotificationService,private modalService: BsModalService) { 
    this.unapprovedreimbursementform = new FormGroup({
      month: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
    });
    this.getfilterData();
    this.approverejectreimbursementform = new FormGroup({
      comment: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {}

  getfilterData()
  {
    var year;var month; 
    $('#UnapprovedRembursementDataTables').DataTable().destroy();   
    this.unapprovedreimbursementform.controls.year.value == "" ? year = this.currentyear : year =
    this.unapprovedreimbursementform.controls.year.value
    this.unapprovedreimbursementform.controls.month.value == "" ? month = this.cmonth : month =
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
    var approvecheckstore = [];
    $('.checkbox:checked').each(function() {
      var id = $(this).attr('name');
      approvecheckstore.push(id);
      });
    var postdata = { "reimbursement_ids":  approvecheckstore, reason: this.approverejectreimbursementform.controls.comment.value}    
    if(approvecheckstore != undefined && approvecheckstore.length > 0)
    {
      this.api.sendForBulkReimbursementApproval(postdata).subscribe(res => {
        approvecheckstore = []; 
        this.toastr.showSuccess('Reimbursement approved successfully');
        this.approverejectreimbursementform.reset();
        }, (err) => {
        //$('.modal').remove();
        this.toastr.showError(err.error);
      });
    }
    else
    {
      this.toastr.CustomErrorMessage('Please check atleast one Reimbursement');
    } 
  }

  rejectallreimbursement()
  { 
    var rejectcheckstore = [];
    $('.checkbox:checked').each(function() {
      var id = $(this).attr('name');
      rejectcheckstore.push(id);
      });
    var postdata = { "reimbursement_ids":  rejectcheckstore, reason: this.approverejectreimbursementform.controls.comment.value}    
    if(rejectcheckstore != undefined && rejectcheckstore.length > 0)
    {
      this.api.sendForBulkReimbursementRejected(postdata).subscribe(res => {
        rejectcheckstore = []; 
        this.toastr.showSuccess('Reimbursement Rejected successfully');
        this.approverejectreimbursementform.reset();
        }, (err) => {
        //$('.modal').remove();
        this.toastr.showError(err.error);
      });
    }
    else
    {
      this.toastr.CustomErrorMessage('Please check atleast one Reimbursement');
    } 
  }
  userrembursementList(template: TemplateRef<any>, r)
    {
      this.modalRef = this.modalService.show(template);
      var year;var month;
      var user_id=r.user_id;
      this.unapprovedreimbursementform.controls.year.value == "" ? year = this.currentyear : year =
      this.unapprovedreimbursementform.controls.year.value
      this.unapprovedreimbursementform.controls.month.value == "" ? month = this.cmonth : month =
      this.unapprovedreimbursementform.controls.month.value

      this.api.getUserUnapprovedData(year,month, user_id).subscribe((res:any) => {
      this.user_unapproved_reimbursement_data=res.reimbursements;  
      //console.log(this.user_unapproved_reimbursement_data);
       }, (err) => {
         this.toastr.showError(err.error);
       });
    }

  approveSinglereimbursement(r)
  {
      this.api.sendForSingleReimbursementApproval(r).subscribe(res => {
        this.toastr.showSuccess('Reimbursement Approved successfully');
    }, (err) => {
      this.toastr.showError(err.error);
    });
  }

  rejectSinglereimbursement(r)
  {
      //console.log(r);
      this.api.sendForSingleReimbursementRejection(r).subscribe(res => {
        this.toastr.showSuccess('Reimbursement Rejected successfully');
      }, (err) => {
        this.toastr.showError(err.error);
      });
  }

  unapproveviewreimbursement(template: TemplateRef<any>, r)
  {
      this.modalRefchild = this.modalService.show(template);
      this.single_user_data=r;
      var spiltmonthandyear=(r.display_month_year).split('-');
      this.splitmonthyear=spiltmonthandyear;
  }
  
  

}