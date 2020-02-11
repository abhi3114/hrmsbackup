import { Component, OnInit } from '@angular/core';
import {ReimbursementManagerService} from './reimbursement-manager.service';
import {Observable,Subject} from 'rxjs';
import { NotificationService } from '../../shared/service/notification.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.component.html',
  styleUrls: ['./reimbursement.component.css']
})
export class ReimbursementComponent implements OnInit
{
  rembursementform:FormGroup;
  rembursementformdata={month:'',year:''};
  rembursement_api_data:any=[];
  rembursement_api_Data:any;
  /*unapproved_data:any;
  unaprovedData:any;
  rejected_data:any;
  rejectedData:any;*/
  openapproved: boolean = false;
  openunapproved: boolean = false;
  openrejected: boolean = false;
  rembursement_api_Trigger: Subject<any> = new Subject();
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
  /*unapprovedTableTrigger: Subject<any> = new Subject();
  rejectedTableTrigger: Subject<any> = new Subject();*/
  constructor(private api : ReimbursementManagerService,public toastr: NotificationService)
  {
  this.getApprovedData();
  }

  ngOnInit() {
    this.rembursementform = new FormGroup({
      month: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
    });
  }

   getApprovedData()
   {
    this.openapproved = true;
    this.openunapproved = false;
    this.openrejected = false;
    /*this.api.getApproved(month,year).subscribe(res => {
      this.approved_data=res ;
      console.log(this.approved_data);
      //this.leavesData=this.leaves_data.leaves_data;
      //this.leaveTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });*/
   }
   getUnapprovedData()
   {
    this.openunapproved = true;
    this.openapproved = false;
    this.openrejected = false;
    this.api.getUnapproved().subscribe(res => {
      this.rembursement_api_data=res;
      console.log(this.rembursement_api_data);
      //this.leavesData=this.leaves_data.leaves_data;
      //this.leaveTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });

   }
   getRejectedData()
   {
    this.openrejected = true;
    this.openapproved = false;
    this.openunapproved = false;
    this.api.getRejected().subscribe(res => {
      this.rembursement_api_data=res;
      console.log(this.rembursement_api_data);
      //this.leavesData=this.leaves_data.leaves_data;
      //this.leaveTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });
   }
   pushData()
   {
    var year=this.rembursementform.controls.year.value;
    var month=this.rembursementform.controls.month.value;
    this.openapproved = true;
    this.openunapproved = false;
    this.openrejected = false;
    this.api.getApproved(month,year).subscribe((res:any) => {

      this.rembursement_api_data=res;
      console.log(this.rembursement_api_data);
    }, (err) => {
      this.toastr.showError(err.error);
    });

  }

}
