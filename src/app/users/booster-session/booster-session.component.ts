import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BoosterSessionService } from './booster-session.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable,Subject} from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NotificationService } from '../../shared/service/notification.service';
@Component({
  selector: 'app-booster-session',
  templateUrl: './booster-session.component.html',
  styleUrls: ['./booster-session.component.css']
  })
export class BoosterSessionComponent implements OnInit {
  user_data:any;booster_session_data:any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  boosterSessionTableOptions: DataTables.Settings = {};
  boosterSessionTableTrigger: Subject<any> = new Subject();
  responseData={ response:'',rating:'',comment:'',reason:''};
  responseForm: FormGroup;
  modalRef: BsModalRef;
  config = {
    animated:true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  };
  max: number = 5;
  isReadonly: boolean = false; status:any; booster_id:any;api_data:any;isLoading:boolean=false;
  constructor(private router:Router,private api:BoosterSessionService,private modalService: BsModalService,public toastr: NotificationService)
  {
    this.boosterSessionTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
    this.api.getBoosterSessions().subscribe(res => {
      this.user_data=res;
      this.booster_session_data=this.user_data.booster_session_data;
      this.boosterSessionTableTrigger.next();
      }, (err) => {
        alert(err.error);
        });
    this.responseForm = new FormGroup({
      response: new FormControl('', [Validators.required]),
      rating: new FormControl('', []),
      comment: new FormControl('', []),
      reason:new FormControl('',[])
      });
    this.responseData.response="yes";
  }

  recordResponse(template: TemplateRef<any>,booster_session_id,status) {
    this.modalRef = this.modalService.show(template, this.config);
    this.status=status; this.booster_id=booster_session_id;
  }
  closeModal()
  {
    this.modalRef.hide();this.responseForm.reset(); this.responseData.response='yes';
  }

  ngOnInit() {
  }

  validateLateMarkForm()
  {
    this.isLoading=true;
    if(this.responseData.response=='yes')
    {
      var postdata =
      {

        "rating": this.responseData.rating,
        "comment": this.responseData.comment,
        "satuts":this.responseData.response
      }
      if((this.responseData.rating == undefined || this.responseData.rating=="") || (this.responseData.comment==undefined || this.responseData.comment==""))
      {
        this.toastr.CustomErrorMessage('Please provide rating and/or comment');    this.isLoading=false;
      }
      else
      {
        this.callsaveApi(postdata)
      }

    }
    else
    {
      var data =
      {
        "reason": this.responseData.reason,
        "satuts":this.responseData.response
      }
      if(this.responseData.reason == undefined || this.responseData.reason=="")
      {
        this.toastr.CustomErrorMessage('Please provide a reason');this.isLoading=false;
      }
      else
      {
        this.callsaveApi(data)
      }
    }

  }

  callsaveApi(data)
  {
    this.api.recordSessionResponse(this.booster_id,data).subscribe(res => {
      this.api_data=res;
      this.responseForm.reset(); this.responseData.response='yes';
      this.modalRef.hide();
      this.toastr.showSuccess('Response recorded');
      this.refreshData();this.isLoading=false;
      }, (err) => {
        this.toastr.showError(err.error);this.isLoading=false;
        });
  }

  refreshData()
  {
    this.api.getBoosterSessions().subscribe(res => {
      this.user_data=res;
      this.booster_session_data=this.user_data.booster_session_data;
      this.rerender();
      }, (err) => {
        alert(err.error);
        });
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.boosterSessionTableTrigger.next();
      });

  }
}
