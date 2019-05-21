import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DataTableDirective } from 'angular-datatables';
import { NotificationService } from '../../shared/service/notification.service';
import { RejectedLeavesService } from './rejected-leaves.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import * as moment from 'moment';

@Component({
  selector: 'app-rejected-leaves',
  templateUrl: './rejected-leaves.component.html',
  styleUrls: ['./rejected-leaves.component.css']
})
export class RejectedLeavesComponent implements OnInit {

  isCollapsed = false; api_data:any;
  rejectedLeavesForm: FormGroup;
  rejectedLeavesData={start_date:'',end_date:''};
  rejectedLeaves:any; showDataTable:Boolean;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  lateMarkTableOptions: DataTables.Settings = {};
  lateMarkTableTableTrigger: Subject<any> = new Subject();
  user_data:any; modalRef: BsModalRef;

  constructor(private router:Router,private api:RejectedLeavesService,private monthandyear:MonthYearService,private modalService: BsModalService,public toastr: NotificationService){
    var filteredData=monthandyear.getFilterData();
    this.rejectedLeavesData.start_date = filteredData[0].firstDay;
    this.rejectedLeavesData.end_date = filteredData[0].lastDay;
    this.rejectedLeavesForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });
    this.lateMarkTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]]
    };
  }

  ngOnInit() {
    var start_date=moment(this.rejectedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.rejectedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getAllRejectedLeaves(start_date ,end_date).subscribe(res => {
      this.api_data=res;
      this.rejectedLeaves=this.api_data.leaves_data;
      this.lateMarkTableTableTrigger.next();
      }, (err) => {
      this.toastr.showError(err.error);
    })
  }

  getFilteredRejectedLeaves(){
    var start_date=moment(this.rejectedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.rejectedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getAllRejectedLeaves(start_date ,end_date).subscribe(res => {
      this.api_data=res;
      this.rejectedLeaves=this.api_data.leaves_data;
      this.rerender();
      }, (err) => {
      this.toastr.showError(err.error);
    })
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.lateMarkTableTableTrigger.next();
      });
  }

}
