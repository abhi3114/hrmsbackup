import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import{ approvedReimbursementService } from './approved-reimbursement.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
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
  monthArray:any;yearArray:any;
  approved_filter:any={selectedmonth:'',selectedyear:''};
  rembursement_api_data:any=[];
  user_approved_reimbursement_data:any=[];
  single_user_data:any=[];
  year:any; month:any;
  user_id:any;
  reimbursementapprovedTableOptions: DataTables.Settings = {};
  reimbursementapprovedTableTrigger: Subject<any> = new Subject();
  modalRef: BsModalRef;
  modalRefchild: BsModalRef;
  splitmonthyear:any;
  employee_department:any;
  attachedbill:boolean=false;
  //is loading is for button
  isLoading:boolean=false;
  //loading is for rembursement count
  loading:boolean=false;
  //singleuserloading is for single user record table
  singleuserloading:boolean=false;
  ola_uber_show:boolean=false;
  hotelshow:boolean=false;
  petrolshow:boolean=false;
  fromtoshow:boolean=false;
  clientnameshow:boolean=false;


  constructor(private api:approvedReimbursementService,public toastr: NotificationService, private modalService: BsModalService,private monthandyear:MonthYearService) {
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
    this.approved_filter.selectedmonth=moment().month()+1;
    this.approved_filter.selectedyear=moment().year();
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
    this.loading=true;
    this.api.getApprovedService(this.year,this.month).subscribe((res:any) => {
    this.rembursement_api_data=res;
    this.reimbursementapprovedTableTrigger.next();
    this.loading=false;
    }, (err) => {
    this.toastr.showError(err.error);
    this.loading=false;
    });
  }

  userrembursementList(template: TemplateRef<any>, r)
  {
    this.modalRef = this.modalService.show(template);
    this.approvedreimbursementform.controls.year.value == "" ? this.year = this.approved_filter.selectedyear : this.year =
    this.approvedreimbursementform.controls.year.value
    this.approvedreimbursementform.controls.month.value == "" ? this.month = this.approved_filter.selectedmonth : this.month =
    this.approvedreimbursementform.controls.month.value
    this.user_id = r.user_id;
    this.singleuserloading=true;
    this.api.getUserRembursementData(this.year,this.month,this.user_id).subscribe((res:any) => {
    this.user_approved_reimbursement_data=res.reimbursements;
    this.singleuserloading=false;
    console.log(res.reimbursements);
    }, (err) => {
    this.toastr.showError(err.error);
    this.singleuserloading=false;
    });

  }
  closeapprovedrembursementdata()
  {
    this.modalRefchild.hide();
  }
  rejectSinglereimbursement(r)
  {
    if(confirm("Are you sure to Reject this reimbursement "))
    {
      var comment=this.approvemodalform.controls.comment.value;
      this.isLoading=true;
      this.api.sendForSingleReimbursementRejection(r, comment).subscribe(res => {
      this.isLoading=false;
      this.getfilterData();
      this.refreshReimbursementData();
      this.modalRefchild.hide();
      this.approvemodalform.reset();
      this.toastr.showSuccess('Reimbursement Rejected successfully');
      }, (err) => {
      this.toastr.showError(err.error);
      this.isLoading=false
      this.modalRefchild.hide();
      this.approvemodalform.reset();
      });
    }
  }

  approveviewreimbursement(template: TemplateRef<any>, r)
  {
    this.modalRefchild = this.modalService.show(template);
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
    //view form will be visible according to category
    if(this.single_user_data.category_name==="Ola/Uber")
    {
      this.ola_uber_show=true;
      if(this.single_user_data.data.expense_for==="client")
      {
        this.clientnameshow=true;
      }
    }
    else
    {
      this.ola_uber_show=false;
      this.clientnameshow=false;
    }
    if(this.single_user_data.category_name==="Hotel Stay")
    {
      this.hotelshow=true;
    }
    else
    {
      this.hotelshow=false;
    }
    if(this.single_user_data.category_name==="Petrol/CNG")
    {
      this.petrolshow=true;
    }
    else
    {
      this.petrolshow=false;
    }
    if(this.single_user_data.category_name==="Hotel Stay" || this.single_user_data.category_name==="Electricity" || this.single_user_data.category_name==="Mobile Bill")
    {
      this.fromtoshow=true;
    }
    else
    {
      this.fromtoshow=false;
    }
  }

  refreshReimbursementData(){
    this.api.getUserRembursementData(this.year,this.month, this.user_id).subscribe((res:any) => {
    this.user_approved_reimbursement_data=res.reimbursements;
    }, (err) => {
    this.toastr.showError(err.error);
    });
  }

}
