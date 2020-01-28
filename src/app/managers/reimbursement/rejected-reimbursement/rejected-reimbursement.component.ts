import { Component, OnInit,TemplateRef} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../shared/service/notification.service';
import{ rejectedReimbursementService } from './rejected-reimbursement.service';
import {Observable,Subject} from 'rxjs';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-rejected-reimbursement',
  templateUrl: './rejected-reimbursement.component.html',
  styleUrls: ['./rejected-reimbursement.component.css']
})
export class RejectedReimbursementComponent implements OnInit {


  rejectedreimbursementform:FormGroup;
  rembursement_api_data:any=[];
  user_rejected_reimbursement_data:any[];
  single_user_data:any=[];
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
 reimbursementrejectedTableOptions: DataTables.Settings = {};
 reimbursementrejectedTableTrigger: Subject<any> = new Subject();
 modalRef: BsModalRef;
 splitmonthyear:any;

  constructor(private api:rejectedReimbursementService,private toastr:NotificationService,private modalService: BsModalService) 
  {
      this.rejectedreimbursementform = new FormGroup({
      month: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
    });

      this.reimbursementrejectedTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[10, 20, 50, -1],
      [10, 20, 50, "All"]]
    };

    this.getfilterData();

   }

  ngOnInit() {}

   getfilterData()
  {    
    var year;var month;
    $('#RejectedRembursementDataTables').DataTable().destroy();
    this.rejectedreimbursementform.controls.year.value == "" ? year = this.currentyear : year =
     this.rejectedreimbursementform.controls.year.value
     this.rejectedreimbursementform.controls.month.value == "" ? month = this.cmonth : month =
     this.rejectedreimbursementform.controls.month.value     
     this.api.getRejectedService(year,month).subscribe((res:any) => {
     this.rembursement_api_data=res;      
       this.reimbursementrejectedTableTrigger.next();      
      }, (err) => {
        this.toastr.showError(err.error);
        });

  }

   userrembursementList(template: TemplateRef<any>, r)
    {
     this.modalRef = this.modalService.show(template);
     var year;var month;
     var user_id=r.user_id;
     this.rejectedreimbursementform.controls.year.value
     this.rejectedreimbursementform.controls.month.value == "" ? month = this.cmonth : month =
     this.rejectedreimbursementform.controls.month.value
     this.api.getUserRejectedData(year,month, user_id).subscribe((res:any) => {
      this.user_rejected_reimbursement_data=res.reimbursements;  
      //console.log(this.user_rejected_reimbursement_data);
    }, (err) => {
      this.toastr.showError(err.error);
    });
   }

   rejectviewreimbursement(template: TemplateRef<any>, r)
   {
      this.modalRef = this.modalService.show(template);
      this.single_user_data=r;
      var spiltmonthandyear=(r.display_month_year).split('-');
      this.splitmonthyear=spiltmonthandyear;
     //console.log(this.single_user_data)
   }

   approveSinglereimbursement(r)
   {
     this.api.sendForSingleReimbursementApproval(r).subscribe(res => {
     this.toastr.showSuccess('Reimbursement Approved successfully');
         }, (err) => {
          this.toastr.showError(err.error);
         });
   }

}
