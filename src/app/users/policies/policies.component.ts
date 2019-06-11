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
  docSrc: string = "/assets/files/leavepolicy.pdf";
  constructor(private router:Router,private api:PoliciesService,public toastr: NotificationService) {

  }

  ngOnInit() {
  }

  getDocSrc(docType) {
    if(docType == "leavepolicy") {
      this.docSrc = "/assets/files/leavepolicy.pdf";
    } else if (docType == "attendancepolicy") {
      this.docSrc = "/assets/files/attendancepolicy.pdf"
    } else {
      this.docSrc = "/assets/files/SHpolicy.pdf"
    }
  }
}
