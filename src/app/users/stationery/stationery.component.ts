import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NotificationService } from '../../shared/service/notification.service';
import { StationeryService } from './stationery.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stationery',
  templateUrl: './stationery.component.html',
  styleUrls: ['./stationery.component.css']
  })
export class StationeryComponent implements OnInit {
  stationeryForm: FormGroup;
  stationeryData={selecteditem:'',quantity:'',comment:''};stationery_data:any;stationery_items:any;
  leaves_data:any;leavesData:any; showDataTable:Boolean;isLoading:Boolean=false;user_data:any;
  stationeries:any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  stationeryTableOptions: DataTables.Settings = {};
  stationeryTableTrigger: Subject<any> = new Subject();
  modalRef: BsModalRef;
  config = {
    animated:true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class:'modal-lg'
  };
  constructor(private router:Router,private api:StationeryService,private monthandyear:MonthYearService,public toastr: NotificationService,private modalService: BsModalService)
  {
    this.stationeryForm = new FormGroup({
      item: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      });
    this.stationeryTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }
  request(template: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(template, this.config);
    this.stationeryData.quantity="1";
  }
  closeRequestModal()
  {
    this.modalRef.hide();
    this.stationeryForm.reset();
    this.stationeryData.selecteditem="";this.stationeryData.comment="";
    this.isLoading=false;
  }

  ngOnInit()
  {

    this.api.getAllStationeryItems().subscribe(res => {
      this.stationery_data=res;
      }, (err) => {
        this.toastr.showError(err.error);
        });
    this.api.getAllStationery().subscribe(res => {
      this.stationeries=res;
      this.stationeryTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });
  }
  validateRequestForm()
  {
    this.isLoading=true;
    var postdata=
    {
      "stationary_request":
      {
        "stationary_id":this.stationeryData.selecteditem,
        "quantity":this.stationeryData.quantity,
        "comment":this.stationeryData.comment,
      }

    }
    this.api.requestStationery(postdata).subscribe(res => {
      this.user_data=res;
      this.modalRef.hide();
      this.toastr.showSuccess("Stationery Requested");
      this.stationeryForm.reset();
      this.stationeryData.selecteditem="";
      this.stationeryData.comment="";
      this.refreshData();
      this.isLoading=false;
      }, (err) => {
        this.toastr.showError(err.error);this.isLoading=false;
        });
  }
  refreshData()
  {
    this.api.getAllStationery().subscribe(res => {
      this.stationeries=res;
      this.rerender();
      }, (err) => {
        this.toastr.showError(err.error);
        });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.stationeryTableTrigger.next();
      });
  }

}
