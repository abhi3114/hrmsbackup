import { Component, OnInit,TemplateRef} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../shared/service/notification.service';
import{ rejectedReimbursementService } from './rejected-reimbursement.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
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
  rejectmodalform:FormGroup;
  rembursement_api_data:any=[];
  user_rejected_reimbursement_data:any[];
  single_user_data:any=[];
  monthArray:any;yearArray:any;
  rejected_filter:any={selectedmonth:'',selectedyear:''};
  reimbursementrejectedTableOptions: DataTables.Settings = {};
  reimbursementrejectedTableTrigger: Subject<any> = new Subject();
  modalRef: BsModalRef;
  modalRefchild: BsModalRef;
  splitmonthyear:any;
  user_id:any;
  year:any;
  month:any;
  attachedbill:boolean=false;
  //loading is for table
  loading:boolean=false;
  //isLoading is for form/button
  isLoading:boolean=false;

  constructor(private api:rejectedReimbursementService,private toastr:NotificationService,private modalService: BsModalService,private monthandyear:MonthYearService)
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

    this.rejectmodalform= new FormGroup({
          comment: new FormControl('', [Validators.required]),
        });

    this.monthArray=this.monthandyear.populateMonth();
    this.yearArray=this.monthandyear.populateYear();
    this.rejected_filter.selectedmonth=moment().month()+1;
    this.rejected_filter.selectedyear=moment().year();
    //console.log(this.rejected_filter.selectedyear,this.rejected_filter.selectedmonth)

    this.getfilterData();

   }

  ngOnInit() {}

   getfilterData()
  {
    $('#RejectedRembursementDataTables').DataTable().destroy();
    this.rejectedreimbursementform.controls.year.value == "" ? this.year = this.rejected_filter.selectedyear : this.year =
    this.rejectedreimbursementform.controls.year.value
    this.rejectedreimbursementform.controls.month.value == "" ? this.month = this.rejected_filter.selectedmonth : this.month =
    this.rejectedreimbursementform.controls.month.value
    this.loading=true;
    this.api.getRejectedService(this.year,this.month).subscribe((res:any) => {
    this.rembursement_api_data=res;
    this.loading=false;
    this.reimbursementrejectedTableTrigger.next();
    }, (err) => {
    this.toastr.showError(err.error);
    this.loading=false;
    });

  }

   userrembursementList(template: TemplateRef<any>, r)
    {
     this.modalRef = this.modalService.show(template);
     this.user_id=r.user_id;
     this.rejectedreimbursementform.controls.year.value == "" ? this.year = this.rejected_filter.selectedyear : this.year =
     this.rejectedreimbursementform.controls.year.value
     this.rejectedreimbursementform.controls.month.value == "" ? this.month = this.rejected_filter.selectedmonth : this.month =
     this.rejectedreimbursementform.controls.month.value
     this.loading=true;
     this.api.getUserRejectedData(this.year,this.month,this.user_id).subscribe((res:any) => {
     this.user_rejected_reimbursement_data=res.reimbursements;
     this.loading=false;
    }, (err) => {
      this.toastr.showError(err.error);
      this.loading=false;
    });
   }

   rejectviewreimbursement(template: TemplateRef<any>, r)
   {
      this.modalRefchild= this.modalService.show(template);
      this.single_user_data=r;
      if(r.receipt_path==null || r.receipt_path=="undefined" || r.receipt_path=="")
      {
        this.attachedbill=true;
      }
      else
      {
        this.attachedbill=false;
      }
      var spiltmonthandyear=(r.display_month_year).split('-');
      this.splitmonthyear=spiltmonthandyear;
     //console.log(this.single_user_data)
   }

   approveSinglereimbursement(r)
   {
      if(confirm("Are you sure to Approve this reimbursement "))
      {
        var comment=this.rejectmodalform.controls.comment.value;
        this.isLoading=true;
        this.api.sendForSingleReimbursementApproval(r,comment).subscribe(res => {
        this.isLoading=false;
        this.getfilterData()
        this.refreshReimbursementData()
        this.modalRefchild.hide();
        this.rejectmodalform.reset();
       this.toastr.showSuccess('Reimbursement Approved successfully');
           }, (err) => {
            this.toastr.showError(err.error);
            this.isLoading=false;
            this.modalRefchild.hide();
           this.rejectmodalform.reset();
           });
      }
    }

    refreshReimbursementData(){
    this.api.getUserRejectedData(this.year,this.month,this.user_id).subscribe((res:any) => {
    this.user_rejected_reimbursement_data=res.reimbursements;
    }, (err) => {
    this.toastr.showError(err.error);
    });
  }
}
