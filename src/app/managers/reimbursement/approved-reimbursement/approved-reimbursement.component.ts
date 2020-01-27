import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import{ approvedReimbursementService } from './approved-reimbursement.service';
import { NotificationService } from '../../../shared/service/notification.service';
import {Observable,Subject} from 'rxjs';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-approved-reimbursement',
  templateUrl: './approved-reimbursement.component.html',
  styleUrls: ['./approved-reimbursement.component.css']
})
export class ApprovedReimbursementComponent implements OnInit {

  
  approvedreimbursementform:FormGroup;
  rejectReimbursementForm:FormGroup;
  rembursement_api_data:any=[];
  user_approved_reimbursement_data:any[];
  single_user_data:any[];
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
 reimbursementapprovedTableOptions: DataTables.Settings = {};
 reimbursementapprovedTableTrigger: Subject<any> = new Subject();
 modalRef: BsModalRef;


  constructor(private api:approvedReimbursementService,public toastr: NotificationService, private modalService: BsModalService) { 
      this.approvedreimbursementform = new FormGroup({
      month: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
    });

      this.rejectReimbursementForm = new FormGroup({
          comment: new FormControl('', [Validators.required]),
        });

      this.reimbursementapprovedTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[10, 20, 50, -1],
      [10, 20, 50, "All"]]
    };

    this.getfilterData();
  }

  ngOnInit() {}

  rejectallreimbursement()
  {
    console.log(this.rejectReimbursementForm.controls.comment.value)
    var rejectcheckstore = [];
    $('.checkbox:checked').each(function() {
      var id = $(this).attr('name');
      rejectcheckstore.push(id);
      });
    var postdata = { "reimbursement_ids":  rejectcheckstore, reason: this.rejectReimbursementForm.controls.comment.value}    
    if(rejectcheckstore != undefined && rejectcheckstore.length > 0)
    {
      this.api.sendForBulkReimbursementRejected(postdata).subscribe(res => {
        rejectcheckstore = []; 
        this.toastr.showSuccess('Reimbursement Rejected successfully');
        this.rejectReimbursementForm.reset();
        }, (err) => {
        //$('.modal').remove();
        this.toastr.showError(err.error);
      });
    }
    else
    {
      this.toastr.CustomErrorMessage('Please check atleast one Late Mark');
    } 
  }

  getfilterData()
  {
    var year;var month;
    $('#ApprovedRembursementDataTables').DataTable().destroy();
    this.approvedreimbursementform.controls.year.value == "" ? year = this.currentyear : year =
     this.approvedreimbursementform.controls.year.value
     this.approvedreimbursementform.controls.month.value == "" ? month = this.cmonth : month =
     this.approvedreimbursementform.controls.month.value     
     this.api.getApprovedService(year,month).subscribe((res:any) => {
     this.rembursement_api_data=res;      
      this.reimbursementapprovedTableTrigger.next();       
      }, (err) => {
        this.toastr.showError(err.error);
        });    
  }

  userrembursementList(template: TemplateRef<any>, r)
  {
     this.modalRef = this.modalService.show(template);
     var year;var month;
     this.approvedreimbursementform.controls.year.value == "" ? year = this.currentyear : year =
     this.approvedreimbursementform.controls.year.value
     this.approvedreimbursementform.controls.month.value == "" ? month = this.cmonth : month =
     this.approvedreimbursementform.controls.month.value
     var user_id=r.user_id;
      this.api.getUserRembursementData(year,month, user_id).subscribe((res:any) => {
      this.user_approved_reimbursement_data=res.reimbursements;  
      //console.log(this.user_approved_reimbursement_data);
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

  approveviewreimbursement(template: TemplateRef<any>, r)
  {
    this.modalRef = this.modalService.show(template);
    this.single_user_data=r;
    console.log(this.single_user_data)    
  }

}