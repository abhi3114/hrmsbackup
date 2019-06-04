import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PoliciesService } from './policies.service';
import {Observable,Subject} from 'rxjs';
import { NotificationService } from '../../shared/service/notification.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
  })
export class PoliciesComponent implements OnInit {
  isLoading:boolean=false; //pdfSrc: string = '/leavepolicy.pdf';
  showLeavePolicy: boolean =true;showAttendancePolicy:boolean =false;
  showSHPolicy:boolean=false;
  config = {
    animated:true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class:'modal-lg'
  };
  constructor(private router:Router,private api:PoliciesService,public toastr: NotificationService)
  {

  }

  ngOnInit() {
  }
  downloadLeavePolicy()
  {
    this.showLeavePolicy=true;
    this.showAttendancePolicy=false;
    this.showSHPolicy=false;
    //this.api.downloadLeavePolicy();
  }
  downloadattendancePolicy()
  {
    this.showLeavePolicy=false;
    this.showAttendancePolicy=true;
    this.showSHPolicy=false;
  }
  downloadSHPolicy()
  {
    this.showLeavePolicy=false;
    this.showAttendancePolicy=false;
    this.showSHPolicy=true;
  }


}
