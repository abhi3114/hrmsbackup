import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import {Observable, Subject } from 'rxjs'
import {UnapprovedService} from './unapproved.service'
import { MonthYearService } from '../../../shared/service/month-year.service';
import { NotificationService } from '../../../shared/service/notification.service';
import * as moment from 'moment';


@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.component.html',
  styleUrls: ['./unapproved.component.css']
})
export class UnapprovedComponent implements OnInit {

  isCollapsed = false;
  leaveids = [];
  unapprovedLeavesData={start_date:'',end_date:''};
  unapproved_leaves_data:any;unapprovedleavesData:any; showDataTable:Boolean;
  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();

  constructor(private router:Router, private api:UnapprovedService, private my:MonthYearService, private notification:NotificationService) {
    var filteredData=my.getFilterData();
    this.unapprovedLeavesData.start_date = filteredData[0].firstDay;
    this.unapprovedLeavesData.end_date = filteredData[0].lastDay;
  }

  ngOnInit() {
    var start_date=moment(this.unapprovedLeavesData.start_date).format('DD/MM/YYYY');
    var end_date=moment(this.unapprovedLeavesData.end_date).format('DD/MM/YYYY');
    this.api.getAllUnapprovedSubordinateLeave(start_date,end_date).subscribe(res => {
      this.unapproved_leaves_data=res;
      this.leaveTableOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      this.leaveTableTrigger.next();
      }, (err) => {
      alert(err.error);
    });
  }

  checkALL(){
    if ($('.check-box:checked').length > 0)
      $('.checkbox').prop('checked', true);
    else
      $('.checkbox').prop('checked', false);
  }

  save(){
    var leave_ids = []
    $('.checkbox:checked').each(function() {
      var id = $(this).attr('name');
      leave_ids.push(id);
    });
    var postdata = { "leave_ids":  leave_ids}
    if(leave_ids != undefined && leave_ids.length > 0)
    {
      this.api.sendForLeaveApproval(postdata).subscribe(res => {
        leave_ids = []
        var start_date=moment(this.unapprovedLeavesData.start_date).format('DD/MM/YYYY');
        var end_date=moment(this.unapprovedLeavesData.end_date).format('DD/MM/YYYY');
        this.api.getAllUnapprovedSubordinateLeave(start_date,end_date).subscribe(res => {
          this.unapproved_leaves_data=res;
          }, (err) => {
          alert(err.error);
        });
        this.notification.showSuccess('Leave approved successfully');
        }, (err) => {
        this.notification.showError('err.error');
      });
    }
    else
    {
      this.notification.CustomErrorMessage('Please check atleast one unapproved leave');
    }
  }

}
