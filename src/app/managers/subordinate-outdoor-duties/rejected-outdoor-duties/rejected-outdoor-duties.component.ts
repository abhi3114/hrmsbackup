import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {Observable,Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../../shared/service/notification.service';
import { RejectedOutdoorDutyService } from './rejected-outdoor-duty.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import * as moment from 'moment';

@Component({
  selector: 'app-rejected-outdoor-duties',
  templateUrl: './rejected-outdoor-duties.component.html',
  styleUrls: ['./rejected-outdoor-duties.component.css']
})
export class RejectedOutdoorDutiesComponent implements OnInit {

  isCollapsed = false;
  rejected_outdoor_duty_data:any;
  user_rejected_outdoor_data:any;
  showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();
  modalRef: BsModalRef;

  constructor(private router:Router, private api:RejectedOutdoorDutyService, private monthandyear:MonthYearService, private notification:NotificationService, private modalService: BsModalService) {
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }

  ngOnInit() {
    this.api.getAllRejectedOutdoorDuties().subscribe(res => {
      this.rejected_outdoor_duty_data=res;
      this.leaveTableTrigger.next();
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  userOutdoorsList(template: TemplateRef<any>, l) {
    this.modalRef = this.modalService.show(template);
    var user_id = l.user_id
    this.api.getRejectedSpecificSubordinateOutdoors(user_id).subscribe(res => {
      this.user_rejected_outdoor_data = res;
    }, (err) => {
      this.notification.showError(err.error);
    });
  }
}
