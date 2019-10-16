import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Component, OnInit,ViewChild, TemplateRef } from '@angular/core';
import {Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {UnapprovedService} from './unapproved.service'
import { MonthYearService } from '../../../shared/service/month-year.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as moment from 'moment';


@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.component.html',
  styleUrls: ['./unapproved.component.css']
  })
export class UnapprovedComponent implements OnInit {

  isCollapsed = false;
  leaveids = [];
  unapprovedLeavesForm: FormGroup;
  unapprovedLeavesData={start_date:'',end_date:''};
  unapproved_leaves_data:any;user_id:any; showDataTable:Boolean;
  user_unapproved_leaves_data:any
  updateLeavesForm: FormGroup;
  updateLeavesData={comment:''};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  modalRef: BsModalRef;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router, private api:UnapprovedService, private my:MonthYearService, private notification:NotificationService, private modalService: BsModalService) {
    var filteredData=my.getFilterData();
    this.unapprovedLeavesData.start_date = filteredData[0].firstDay;
    this.unapprovedLeavesData.end_date = filteredData[0].lastDay;
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
    this.unapprovedLeavesForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
    this.updateLeavesForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    var start_date=moment(this.unapprovedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getAllUnapprovedSubordinateLeaves(start_date,end_date).subscribe(res => {
      this.unapproved_leaves_data=res;
      this.leaveTableTrigger.next();
      }, (err) => {
        this.notification.showError(err.error);
        });
  }

  checkALL()
  {
    if ($('.check-box:checked').length > 0)
    $('.checkbox').prop('checked', true);
    else
    $('.checkbox').prop('checked', false);
  }

  save(user_id){
    var unapproved_leave_ids = []
    $('.checkbox:checked').each(function() {
      var id = $(this).attr('name');
      unapproved_leave_ids.push(id);
      });
    var postdata = { "leave_ids":  unapproved_leave_ids, reason: this.updateLeavesData.comment}
    if(unapproved_leave_ids != undefined && unapproved_leave_ids.length > 0)
    {
      this.api.sendForBulkLeavesApproval(postdata).subscribe(res => {
        unapproved_leave_ids = [];
        this.refreshData();
        this.refreshList(user_id);
        this.notification.showSuccess('Leaves are approved successfully');
        this.updateLeavesForm.reset();
        }, (err) => {
          $('.modal').remove();
          this.notification.showError(err.error);
          });
    }
    else
    {
      this.notification.CustomErrorMessage('Please check atleast one leave');
    }
  }

  refreshData() {
    var start_date=moment(this.unapprovedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getAllUnapprovedSubordinateLeaves(start_date,end_date).subscribe(res => {
      this.unapproved_leaves_data=res;
      $('.check-box').prop('checked', false);
      this.rerender();
      }, (err) => {
        this.notification.showError(err.error);
        });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.leaveTableTrigger.next();
      });
  }

  refreshList(user_id){
    var start_date=moment(this.unapprovedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedLeavesData.end_date).format('DD/MM/YYYY');
    this.user_id = user_id
    this.api.getAllUnApprovedSpecificSubordinateLeaves(start_date,end_date, this.user_id).subscribe(res => {
      this.user_unapproved_leaves_data=res;
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  filterUnapprovedLeavesForm(){
    var start_date=moment(this.unapprovedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getAllUnapprovedSubordinateLeaves(start_date,end_date).subscribe(res => {
      this.unapproved_leaves_data=res;
      this.rerender();
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  userLeavesList(template: TemplateRef<any>, l) {
    this.modalRef = this.modalService.show(template);
    var start_date=moment(this.unapprovedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedLeavesData.end_date).format('DD/MM/YYYY');
    this.user_id = l.user_id
    this.api.getAllUnApprovedSpecificSubordinateLeaves(start_date,end_date, this.user_id).subscribe(res => {
      this.user_unapproved_leaves_data=res;
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  validateRecordLeavesResponseForm()
  {
    var unapproved_leaves = []
     $('.checkbox:checked').each(function() {
       var id = $(this).attr('name');
       unapproved_leaves.push(id);
       });
     var postdata = { "leave_ids":  unapproved_leaves, reason: this.updateLeavesData.comment}
     if(unapproved_leaves != undefined && unapproved_leaves.length > 0)
     {
       this.api.sendForBulkLeavesRejection(postdata).subscribe(res => {
         unapproved_leaves = [];
         this.refreshData();
         this.refreshList(this.user_id);
         this.updateLeavesForm.reset();
         this.notification.showSuccess('Leaves are rejected successfully');
         }, (err) => {
           this.notification.showError(err.error);
           });
     }
     else
     {
       this.notification.CustomErrorMessage('Please check atleast one leave');
     }
  }

  approveSingleLeave(l){
    this.api.sendForSingleLeaveApproval(l).subscribe(res => {
    this.refreshData();
    this.refreshList(this.user_id)
    this.notification.showSuccess('Leave is approved successfully');
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  rejectSingleLeave(l, comment) {
    if (comment == undefined || comment == "") {
      this.notification.CustomErrorMessage("Please enter rejection rejection");
    } else {
      this.api.sendForSingleLeaveRejection(l, comment).subscribe(res => {
      this.refreshData();
      this.refreshList(this.user_id);
      this.updateLeavesForm.reset();
      this.notification.showSuccess('Leave is rejected successfully');
      }, (err) => {
        this.notification.showError(err.error);
      });
    }
  }
}
