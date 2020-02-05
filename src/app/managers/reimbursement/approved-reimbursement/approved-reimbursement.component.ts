import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import{ approvedReimbursementService } from './approved-reimbursement.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import { CommonSalaryService } from '../../../shared/service/common-salary.service';
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
  approvemodalform:FormGroup;
  monthArray:any;yearArray:any;filteredData:any;
  approved_filter={selectedmonth:'',selectedyear:''};
  rembursement_api_data:any=[];
  user_approved_reimbursement_data:any[];
  single_user_data:any[];
  year:any; month:any;
  user_id:any;
 reimbursementapprovedTableOptions: DataTables.Settings = {};
 reimbursementapprovedTableTrigger: Subject<any> = new Subject();
 modalRef: BsModalRef;
 modalRefchild: BsModalRef;
 splitmonthyear:any;
 employee_department:any;



  constructor(private api:approvedReimbursementService,public toastr: NotificationService, private modalService: BsModalService,private monthandyear:MonthYearService,private currentmonthandyear:CommonSalaryService) {
      this.approvedreimbursementform = new FormGroup({
      month: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
    });

      this.reimbursementapprovedTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[10, 20, 50, -1],
      [10, 20, 50, "All"]]
    };

      this.approvemodalform= new FormGroup({
          comment: new FormControl('', [Validators.required]),
        });

    this.monthArray=this.monthandyear.populateMonth();
    this.yearArray=this.monthandyear.populateYear();
    this.filteredData=this.currentmonthandyear.getMonthandYear();
    this.approved_filter.selectedmonth=this.filteredData.selectedmonth;
    this.approved_filter.selectedyear= this.filteredData.selectedyear;
    this.getfilterData();

  }

  ngOnInit() {}



  getfilterData()
  {
    $('#ApprovedRembursementDataTables').DataTable().destroy();
    this.approvedreimbursementform.controls.year.value == "" ? this.year = this.approved_filter.selectedyear : this.year =
    this.approvedreimbursementform.controls.year.value
    this.approvedreimbursementform.controls.month.value == "" ? this.month = this.approved_filter.selectedmonth : this.month =
    this.approvedreimbursementform.controls.month.value
    this.api.getApprovedService(this.year,this.month).subscribe((res:any) => {
    this.rembursement_api_data=res;
    this.reimbursementapprovedTableTrigger.next();
    }, (err) => {
    this.toastr.showError(err.error);
    });
  }

  userrembursementList(template: TemplateRef<any>, r)
  {
    this.modalRef = this.modalService.show(template);
    this.approvedreimbursementform.controls.year.value == "" ? this.year = this.approved_filter.selectedyear : this.year =
    this.approvedreimbursementform.controls.year.value
    this.approvedreimbursementform.controls.month.value == "" ? this.month = this.approved_filter.selectedmonth : this.month =
    this.approvedreimbursementform.controls.month.value
    this.user_id = r.user_id
    this.api.getUserRembursementData(this.year,this.month,this.user_id).subscribe((res:any) => {
    this.user_approved_reimbursement_data=res.reimbursements;
    console.log(res.reimbursements);
    }, (err) => {
    this.toastr.showError(err.error);
    });

  }

  rejectSinglereimbursement(r)
  {
    if(confirm("Are you sure to Reject this reimbursement "))
    {
      var comment=this.approvemodalform.controls.comment.value;
      this.api.sendForSingleReimbursementRejection(r, comment).subscribe(res => {
      this.getfilterData()
      this.refreshReimbursementData()
      this.modalRefchild.hide();
      this.approvemodalform.reset();
      this.toastr.showSuccess('Reimbursement Rejected successfully');
      }, (err) => {
      this.toastr.showError(err.error);
      this.modalRefchild.hide();
      this.approvemodalform.reset();
      });
    }
  }

  approveviewreimbursement(template: TemplateRef<any>, r)
  {
    this.modalRefchild = this.modalService.show(template);
    this.single_user_data=r;
    var spiltmonthandyear=(r.display_month_year).split('-');
    this.splitmonthyear=spiltmonthandyear;
  }

  refreshReimbursementData(){
    this.api.getUserRembursementData(this.year,this.month, this.user_id).subscribe((res:any) => {
    this.user_approved_reimbursement_data=res.reimbursements;
    }, (err) => {
    this.toastr.showError(err.error);
    });
  }

}
