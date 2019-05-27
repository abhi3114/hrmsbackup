import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {Observable,Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../../shared/service/notification.service';
import { RejectedService } from './rejected.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import * as moment from 'moment';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.css']
})
export class RejectedComponent implements OnInit {

  isCollapsed = false;
  rejectedLeavesForm: FormGroup;
  rejectedLeavesData={start_date:'',end_date:''};
  rejected_leaves_data:any; showDataTable:Boolean;
  user_rejected_leaves_data:any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();
  modalRef: BsModalRef;

  constructor(private router:Router, private api:RejectedService, private monthandyear:MonthYearService, private notification:NotificationService, private modalService: BsModalService) {
    var filteredData=monthandyear.getFilterData();
    this.rejectedLeavesForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
    this.rejectedLeavesData.start_date = filteredData[0].firstDay;
    this.rejectedLeavesData.end_date = filteredData[0].lastDay;
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }

  ngOnInit() {
    var start_date = moment(this.rejectedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date = moment(this.rejectedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getAllRejectedLeaves(start_date, end_date).subscribe(res => {
      this.rejected_leaves_data=res;
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

  validateRejectedLeavesForm(){
    var start_date = moment(this.rejectedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date = moment(this.rejectedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getAllRejectedLeaves(start_date, end_date).subscribe(res => {
      this.rejected_leaves_data = res;
      this.rerender();
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  userLeavesList(template: TemplateRef<any>, l) {
    this.modalRef = this.modalService.show(template);
    var start_date=moment(this.rejectedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.rejectedLeavesData.end_date).format('DD/MM/YYYY');
    var user_id = l.user_id
    this.api.getRejectedSpecificSubordinateLeaves(start_date, end_date, user_id).subscribe(res => {
      this.user_rejected_leaves_data = res;
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

}
