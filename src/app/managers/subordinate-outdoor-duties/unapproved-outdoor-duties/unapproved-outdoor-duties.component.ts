import { Component, OnInit,ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { UnapprovedOutdoorDutiesService } from './unapproved-outdoor-duties.service';
import { MonthYearService } from '../../../shared/service/month-year.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NotificationService } from '../../../shared/service/notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-unapproved-outdoor-duties',
  templateUrl: './unapproved-outdoor-duties.component.html',
  styleUrls: ['./unapproved-outdoor-duties.component.css']
  })
export class UnapprovedOutdoorDutiesComponent implements OnInit {

  isCollapsed = false;
  unapproved_outdoor_duty_data:any; showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();
  user_unapproved_outdoor_data:any;
  unapprovedOutdoorForm: FormGroup;
  user_id:any;
  modalRef: BsModalRef;
  updateOutdoorsForm: FormGroup;
  updateOutdoorsData={comment:''};
  unapprovedOutdoorFormData={start_date:'',end_date:''};

  constructor(private router:Router, private notification:NotificationService, private api:UnapprovedOutdoorDutiesService,private monthandyear:MonthYearService, private modalService: BsModalService)
  {
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
    var filteredData=monthandyear.getFilterData();
    this.unapprovedOutdoorFormData.start_date = filteredData[0].firstDay;
    this.unapprovedOutdoorFormData.end_date = filteredData[0].lastDay;
    this.unapprovedOutdoorForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
    this.updateOutdoorsForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    var start_date=moment(this.unapprovedOutdoorFormData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedOutdoorFormData.end_date).format('DD/MM/YYYY');
    this.api.getAllUnapprovedOutDoorDuties(start_date,end_date).subscribe(res => {
      this.unapproved_outdoor_duty_data=res;
      this.leaveTableTrigger.next();
      }, (err) => {
        this.notification.showError(err.error);
        });
  }

  filterSubOrdinateOutdoor(){
    var start_date=moment(this.unapprovedOutdoorFormData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedOutdoorFormData.end_date).format('DD/MM/YYYY');
    this.api.getAllUnapprovedOutDoorDuties(start_date,end_date).subscribe(res => {
      this.unapproved_outdoor_duty_data=res;
      this.rerender();
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  validateRecordOutdoorResponseForm()
  {

  }

  userOutdoorsList(template: TemplateRef<any>, l)
  {
    this.modalRef = this.modalService.show(template);
    var start_date=moment(this.unapprovedOutdoorFormData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedOutdoorFormData.end_date).format('DD/MM/YYYY');
    this.user_id = l.user_id
    this.api.getAllUnApprovedSpecificSubordinateOutdoors(start_date,end_date, this.user_id).subscribe(res => {
      this.user_unapproved_outdoor_data=res;
    }, (err) => {
      this.notification.showError(err.error);
    });
  }

  checkAll(){
    if ($('.check-box:checked').length > 0)
    $('.checkbox').prop('checked', true);
    else
    $('.checkbox').prop('checked', false);
  }

  save(){
    var unapproved_outdoor_ids = []
    $('.checkbox:checked').each(function() {
      var id = $(this).attr('name');
      unapproved_outdoor_ids.push(id);
      });
    var postdata = { "outdoor_ids":  unapproved_outdoor_ids}
    if(unapproved_outdoor_ids != undefined && unapproved_outdoor_ids.length > 0)
    {
      this.api.sendForOutDoorDutiesApproval(postdata).subscribe(res => {
        unapproved_outdoor_ids = [];
        this.notification.showSuccess('OutDoor Duty approved successfully');
        this.getallODS();
        }, (err) => {
          this.notification.showError(err.error);
          });
    }
    else
    {
      this.notification.CustomErrorMessage('Please check atleast one outdoor duty');
    }
  }

  getallODS()
  {
    var start_date=moment(this.unapprovedOutdoorFormData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedOutdoorFormData.end_date).format('DD/MM/YYYY');
    this.api.getAllUnapprovedOutDoorDuties(start_date,end_date).subscribe(res => {
      this.unapproved_outdoor_duty_data=res;
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

}
