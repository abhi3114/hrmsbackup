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
  rejectedOutDoorDutyForm: FormGroup;
  rejectedOutDoorDutyData={start_date:'',end_date:''};
  rejected_outdoor_duty_data:any; showDataTable:Boolean;
  user_rejected_outdoor_data:any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();
  modalRef: BsModalRef;

  constructor(private router:Router, private api:RejectedOutdoorDutyService, private monthandyear:MonthYearService, private notification:NotificationService, private modalService: BsModalService) {
    var filteredData=monthandyear.getFilterData();
    this.rejectedOutDoorDutyForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
    this.rejectedOutDoorDutyData.start_date = filteredData[0].firstDay;
    this.rejectedOutDoorDutyData.end_date = filteredData[0].lastDay;
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }

  ngOnInit() {
    var start_date = moment(this.rejectedOutDoorDutyData.start_date).format('DD/MM/YYYY');
    var end_date = moment(this.rejectedOutDoorDutyData.end_date).format('DD/MM/YYYY');
    this.api.getAllRejectedOutdoorDuties(start_date, end_date).subscribe(res => {
      this.rejected_outdoor_duty_data=res;
      this.leaveTableTrigger.next();
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.leaveTableTrigger.next();
    });
  }

  userOutdoorsList(template: TemplateRef<any>, l) {
    this.modalRef = this.modalService.show(template);
    var start_date=moment(this.rejectedOutDoorDutyData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.rejectedOutDoorDutyData.end_date).format('DD/MM/YYYY');
    var user_id = l.user_id
    this.api.getRejectedSpecificSubordinateOutdoors(start_date, end_date, user_id).subscribe(res => {
      this.user_rejected_outdoor_data = res;
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  validateRejectedOutDoorDutyForm(){
    var start_date = moment(this.rejectedOutDoorDutyData.start_date).format('DD/MM/YYYY');
    var end_date = moment(this.rejectedOutDoorDutyData.end_date).format('DD/MM/YYYY');
    this.api.getAllRejectedOutdoorDuties(start_date, end_date).subscribe(res => {
      this.rejected_outdoor_duty_data = res;
      this.rerender();
    }, (err) => {
      this.notification.showError(err.error);
    });
  }
}
