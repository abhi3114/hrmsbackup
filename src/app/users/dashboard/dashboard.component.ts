import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { DashBoardService } from './dashboard.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import {Observable,Subject} from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  })
export class DashboardComponent implements OnInit {
  inventory_data:any; start_date:any; end_date:any;leaves_data:any;outdoor_duties_data:any;
  late_marks_data:any;missing_attendance_data:any;mentorship_feedback_data:any;
  leavesData:any;invertoryData:any;odData:any;lmData:any;maData:any;
  mentorData:any;isMentororMentee:any;leavesArray:any[];punchArray:any[];monthArray:any[];
  yearArray:any[];user_data:any;

  leaveTableOptions: DataTables.Settings = {};
  leaveTableTrigger: Subject<any> = new Subject();
  assetTableOptions: DataTables.Settings = {};
  assetTableTrigger: Subject<any> = new Subject();
  outdoorDutyTableOptions: DataTables.Settings = {};
  outdoorDutyTableTrigger: Subject<any> = new Subject();
  lateMarkTableOptions: DataTables.Settings = {};
  lateMarkTableTableTrigger: Subject<any> = new Subject();
  missingAttendanceTableOptions: DataTables.Settings = {};
  missingAttendanceTableTrigger: Subject<any> = new Subject();
  mentorshipTableOptions: DataTables.Settings = {};
  mentorshipTableTrigger: Subject<any> = new Subject();
  modalRef: BsModalRef;

  applyLeaveForm: FormGroup;   applyOutdoorDutiesForm: FormGroup; applyLateMarksForm :FormGroup;
  applyMissingAttendanceForm:FormGroup; salarySlipDownloadForm:FormGroup;

  applyLeavesData = { start_date:'', end_date:'',leave_type:'',reason:'' };
  applyOutdoorDutiesData = {start_date:'', end_date:'',project_name:'',client_name:'',location:'',reason:''};
  applyLateMarksData={ date:'',comment:''};
  applyMissingAttendanceData={ date:'',punch:'',reason:''};
  salarySlipDownloadData={ selectedyear:'',selectedmonth:''};

  constructor(private router:Router,private api:DashBoardService,private monthandyear:MonthYearService,private modalService: BsModalService,public toastr: ToastrManager)
  {
    this.applyLeaveForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      leave_type: new FormControl('', [Validators.required])
      });
    this.applyOutdoorDutiesForm = new FormGroup({
      start_date_time: new FormControl('', [Validators.required]),
      end_date_time: new FormControl('', [Validators.required]),
      project: new FormControl('', [Validators.required]),
      client: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      purpose: new FormControl('', [Validators.required])
      });
    this.applyLateMarksForm = new FormGroup({
      date_time: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required])
      });
    this.applyMissingAttendanceForm = new FormGroup({
      date_time: new FormControl('', [Validators.required]),
      punch: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required])
      });
    this.salarySlipDownloadForm = new FormGroup({
      year: new FormControl('', [Validators.required]),
      month: new FormControl('', [Validators.required])
      });
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.assetTableOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.outdoorDutyTableOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.lateMarkTableOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.missingAttendanceTableOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.mentorshipTableOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.punchArray=['No Punch','No In Punch','Not Out Punch'];
    if(localStorage.getItem('is_on_probation') == 'true')
    {
      this.leavesArray=['LWP','Half LWP','Early going','Sick'];
    }
    else
    {
      this.leavesArray=['Casual','Early going','Half Day','Sick'];
    }
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    this.start_date = moment(firstDay).format("DD/MM/YYYY");
    this.end_date = moment(lastDay).format("DD/MM/YYYY");

    this.monthArray=this.monthandyear.populateMonth();
    this.yearArray=this.monthandyear.populateYear();



    this.api.getAllLeaves(this.start_date,this.end_date).subscribe(res => {
      this.leaves_data=res;
      this.leavesData=this.leaves_data.leaves_data;
      this.leaveTableTrigger.next();
      }, (err) => {
        this.showError(err.error);
        });

    this.api.getAllInventory().subscribe(res => {
      this.inventory_data=res;
      this.invertoryData=this.inventory_data.inventories_data;
      this.assetTableTrigger.next();
      }, (err) => {
        this.showError(err.error);
        });

    this.api.getAllOutdoorDuties(this.start_date,this.end_date).subscribe(res => {
      this.outdoor_duties_data=res;
      this.odData=this.outdoor_duties_data.outdoors_data;
      this.outdoorDutyTableTrigger.next();
      }, (err) => {
        this.showError(err.error);
        });

    this.api.getAllLateMarks(this.start_date,this.end_date).subscribe(res => {
      this.late_marks_data=res;
      this.lmData=this.late_marks_data.late_marks_data
      this.lateMarkTableTableTrigger.next();
      }, (err) => {
        this.showError(err.error);
        });

    this.api.getAllMissingAttendance(this.start_date,this.end_date).subscribe(res => {
      this.missing_attendance_data=res;
      this.maData=this.missing_attendance_data.attendance_missing_data;
      this.missingAttendanceTableTrigger.next();
      }, (err) => {
        this.showError(err.error);
        });

    this.api.getMentorshipFeedback().subscribe(res => {
      this.mentorship_feedback_data =res;
      this.mentorData=this.mentorship_feedback_data.mentorships_data;
      if(this.mentorData.length>0)
      {
        this.isMentororMentee=this.mentorData[0].user;
        this.mentorshipTableTrigger.next();
      }
      }, (err) => {
        this.showError(err.error);
        });

  }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  validateApplyLeaveForm()
  {
    this.api.applyforLeave(this.applyLeavesData).subscribe(res => {
      this.user_data=res;
      this.modalRef.hide();
      this.applyLeaveForm.reset();
      this.RefreshLeavesData();
      }, (err) => {
        this.showError(err.error);
        });
  }
  RefreshLeavesData()
  {
    this.api.getAllLeaves(this.start_date,this.end_date).subscribe(res => {
      this.leaves_data=res;
      this.leavesData=this.leaves_data.leaves_data;
      }, (err) => {
        this.showError(err.error);
        });
  }
  validateApplyOutdoorDutiesForm()
  {

    var Data=[];
    Data.push({outdoor:this.applyOutdoorDutiesData})
    this.api.applyforOutdoorDuties(Data[0]).subscribe(res => {
      this.user_data=res;
      this.modalRef.hide();
      this.applyOutdoorDutiesForm.reset();
      this.RefreshOutdoorDutiesData();
      }, (err) => {
        this.showError(err.error);
        });
  }
  RefreshOutdoorDutiesData()
  {
    this.api.getAllOutdoorDuties(this.start_date,this.end_date).subscribe(res => {
      this.outdoor_duties_data=res;
      this.odData=this.outdoor_duties_data.outdoors_data;
      }, (err) => {
        this.showError(err.error);
        });
  }
  validateLateMarkForm()
  {
    var Data=[];
    Data.push({late_mark:this.applyLateMarksData})
    this.api.applyforLateMark(Data[0]).subscribe(res => {
      this.user_data=res;
      this.modalRef.hide();
      this.applyLateMarksForm.reset();
      this.RefreshLateMarkData();
      }, (err) => {
        this.showError(err.error);
        });
  }


  RefreshLateMarkData()
  {
    this.api.getAllLateMarks(this.start_date,this.end_date).subscribe(res => {
      this.late_marks_data=res;
      this.lmData=this.late_marks_data.late_marks_data
      }, (err) => {
        this.showError(err.error);
        });
  }
  validateMissingAttendanceForm()
  {
    var Data=[];
    Data.push({attendance_missing:this.applyMissingAttendanceData})
    this.api.applyforMissingAttendance(Data[0]).subscribe(res => {
      this.user_data=res;
      this.modalRef.hide();
      this.applyMissingAttendanceForm.reset();
      this.RefreshMissingAttendanceData();
      }, (err) => {
        this.showError(err.error);
        });
  }
  RefreshMissingAttendanceData()
  {
    this.api.getAllMissingAttendance(this.start_date,this.end_date).subscribe(res => {
      this.missing_attendance_data=res;
      this.maData=this.missing_attendance_data.attendance_missing_data;
      }, (err) => {
        this.showError(err.error);
        });

  }

  updateMissingAttendance(template: TemplateRef<any>,maId)
  {
    this.modalRef = this.modalService.show(template);
  }

  showError(e,position: any = 'top-center') {
    this.toastr.errorToastr(e.message, 'Oops Some went wrong!',{  position: position});
  }

}
