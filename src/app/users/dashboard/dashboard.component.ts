import { Component, OnInit,TemplateRef,ViewChildren, QueryList  } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/service/notification.service';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import * as _ from 'underscore';
import { DashBoardService } from './dashboard.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import { CustomPdfService } from '../../shared/service/custom-pdf.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  })

export class DashboardComponent implements OnInit {
  inventory_data:any; start_date:any; end_date:any;leaves_data:any;outdoor_duties_data:any;
  late_marks_data:any;missing_attendance_data:any;mentorship_feedback_data:any;
  leavesData:any;invertoryData:any;odData:any;lmData:any;maData:any;
  mentorData:any;isMentororMentee:any;leavesArray:any[];punchArray:any[];monthArray:any[];
  yearArray:any[];user_data:any;missing_attendance_Id:any;pdf:any;pdfObj:any;
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
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
  config = {
    animated:true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  };

  applyLeaveForm: FormGroup;   applyOutdoorDutiesForm: FormGroup; applyLateMarksForm :FormGroup;
  applyMissingAttendanceForm:FormGroup; salarySlipDownloadForm:FormGroup;updateMissingAttendanceForm:FormGroup;
  updateLateMarksForm:FormGroup;

  applyLeavesData = { start_date:'', end_date:'',leave_type:'',reason:'' };
  applyOutdoorDutiesData = {start_date:'', end_date:'',project_name:'',client_name:'',location:'',reason:''};
  applyLateMarksData={ date:'',comment:''};
  applyMissingAttendanceData={ date:'',punch:'',reason:''};
  salarySlipDownloadData={ selectedyear:'',selectedmonth:''};
  updateMissingAttendanceData={reason:''};updateLateMarksData={comment:'',id:''}

  constructor(private router:Router,private api:DashBoardService,private monthandyear:MonthYearService,private modalService: BsModalService,public toastr: NotificationService,private pdfservice:CustomPdfService)
  {
    this.applyLeaveForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      leave_type: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required])
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
    this.updateMissingAttendanceForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
      });
    this.updateLateMarksForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
      })
    this.leaveTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]],
      processing: true
    };
    this.assetTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]],
      processing: true
    };
    this.outdoorDutyTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]],
      processing: true
    };
    this.lateMarkTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]],
      processing: true
    };
    this.missingAttendanceTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]],
      processing: true
    };
    this.mentorshipTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, 50,-1],
      [5, 10, 20, 50,"All" ]],
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
        this.toastr.showError(err.error);
        });

    this.api.getAllInventory().subscribe(res => {
      this.inventory_data=res;
      this.invertoryData=this.inventory_data.inventories_data;
      this.assetTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });

    this.api.getAllOutdoorDuties(this.start_date,this.end_date).subscribe(res => {
      this.outdoor_duties_data=res;
      this.odData=this.outdoor_duties_data.outdoors_data;
      this.outdoorDutyTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });

    this.api.getAllLateMarks(this.start_date,this.end_date).subscribe(res => {
      this.late_marks_data=res;
      this.lmData=this.late_marks_data.late_marks_data
      this.lateMarkTableTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });

    this.api.getAllMissingAttendance(this.start_date,this.end_date).subscribe(res => {
      this.missing_attendance_data=res;
      this.maData=this.missing_attendance_data.attendance_missing_data;
      this.missingAttendanceTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
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
        this.toastr.showError(err.error);
        });

  }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
  validateApplyLeaveForm()
  {
    this.api.applyforLeave(this.applyLeavesData).subscribe(res => {
      this.user_data=res;
      this.modalRef.hide();
      this.toastr.showSuccess("Leave Applied");
      this.applyLeaveForm.reset();
      this.applyLeavesData.leave_type="";
      this.RefreshLeavesData();
      }, (err) => {
        this.toastr.showError(err.error);
        });
  }
  RefreshLeavesData()
  {
    this.api.getAllLeaves(this.start_date,this.end_date).subscribe(res => {
      this.leaves_data=res;
      this.leavesData=this.leaves_data.leaves_data;
      this.rerender();
      }, (err) => {
        this.toastr.showError(err.error);
        });
  }
  validateApplyOutdoorDutiesForm()
  {

    var Data=[];
    Data.push({outdoor:this.applyOutdoorDutiesData})
    this.api.applyforOutdoorDuties(Data[0]).subscribe(res => {
      this.user_data=res;
      this.modalRef.hide();
      this.toastr.showSuccess("Outddoor Duty Applied");
      this.applyOutdoorDutiesForm.reset();
      this.RefreshOutdoorDutiesData();
      }, (err) => {
        this.toastr.showError(err.error);
        });
  }
  RefreshOutdoorDutiesData()
  {
    this.api.getAllOutdoorDuties(this.start_date,this.end_date).subscribe(res => {
      this.outdoor_duties_data=res;
      this.odData=this.outdoor_duties_data.outdoors_data;
      this.rerender();
      }, (err) => {
        this.toastr.showError(err.error);
        });
  }
  validateLateMarkForm()
  {
    var Data=[];
    Data.push({late_mark:this.applyLateMarksData})
    this.api.applyforLateMark(Data[0]).subscribe(res => {
      this.user_data=res;
      this.modalRef.hide();
      this.toastr.showSuccess("Late Mark Applied");
      this.applyLateMarksForm.reset();
      this.RefreshLateMarkData();
      }, (err) => {
        this.toastr.showError(err.error);
        });
  }


  RefreshLateMarkData()
  {
    this.api.getAllLateMarks(this.start_date,this.end_date).subscribe(res => {
      this.late_marks_data=res;
      this.lmData=this.late_marks_data.late_marks_data
      this.rerender();
      }, (err) => {
        this.toastr.showError(err.error);
        });
  }
  validateMissingAttendanceForm()
  {
    var Data=[];
    Data.push({attendance_missing:this.applyMissingAttendanceData})
    this.api.applyforMissingAttendance(Data[0]).subscribe(res => {
      this.user_data=res;
      this.modalRef.hide();
      this.toastr.showSuccess("Missing Attendance Applied");
      this.applyMissingAttendanceForm.reset();
      this.applyMissingAttendanceData.punch="";
      this.RefreshMissingAttendanceData();
      }, (err) => {
        this.toastr.showError(err.error);
        });
  }
  RefreshMissingAttendanceData()
  {
    this.api.getAllMissingAttendance(this.start_date,this.end_date).subscribe(res => {
      this.missing_attendance_data=res;
      this.maData=this.missing_attendance_data.attendance_missing_data;
      this.rerender();
      }, (err) => {
        this.toastr.showError(err.error);
        });

  }
  updateMissingAttendance(template: TemplateRef<any>,maId,mareason)
  {
    this.missing_attendance_Id=maId;
    this.modalRef = this.modalService.show(template, this.config);
    this.updateMissingAttendanceData.reason=mareason;
  }
  validateUpdateMissingAttendanceForm()
  {
    this.api.updateMissingAttendance(this.missing_attendance_Id,this.updateMissingAttendanceData).subscribe(res => {
      this.user_data=res;
      this.modalRef.hide();
      this.toastr.showSuccess('Response Recorded');
      this.updateMissingAttendanceForm.reset();
      this.RefreshMissingAttendanceData();
      }, (err) => {
        this.toastr.showError(err.error);
        this.modalRef.hide();
        this.updateMissingAttendanceForm.reset();
        });
  }
  updateLateMarkResponse(template: TemplateRef<any>,lmId,lmreason)
  {
    this.modalRef = this.modalService.show(template, this.config);
    this.updateLateMarksData.comment=lmreason;
    this.updateLateMarksData.id=lmId
  }

  validateRecordLateMarkResponseForm()
  {
    this.api.recordLateMarkResponse(this.updateLateMarksData.id,this.updateLateMarksData).subscribe(res => {
      this.user_data=res;
      this.modalRef.hide();
      this.toastr.showSuccess('Response Recorded');
      this.updateLateMarksForm.reset();
      this.RefreshLateMarkData();
      }, (err) => {
        this.toastr.showError(err.error);
        this.modalRef.hide();
        this.updateLateMarksForm.reset();
        });
  }
  validateSalarySlipForm()
  {
    this.api.getUserSalarySlip(this.salarySlipDownloadData.selectedmonth,this.salarySlipDownloadData.selectedyear).subscribe(res => {
      this.user_data=res;
      this.pdf = pdfMake;
      var monthname=_.find(this.monthArray,{id : parseInt(this.salarySlipDownloadData.selectedmonth) }).name;
      var filename='Salaryslip_'+localStorage.getItem('employee_name')+'_for_'+monthname+'_'+this.salarySlipDownloadData.selectedyear;
      this.pdfObj=  this.pdf.createPdf(this.pdfservice.getSalarySlipPdf(this.user_data, localStorage.getItem('employee_name')));
      this.pdfObj.download(filename);
      this.toastr.showSuccess('Salary Downloaded');
      this.modalRef.hide();
      this.salarySlipDownloadForm.reset();this.salarySlipDownloadData.selectedmonth="";this.salarySlipDownloadData.selectedyear="";
      },(err) => {
        this.toastr.showError(err.error);
        this.salarySlipDownloadForm.reset();this.salarySlipDownloadData.selectedmonth="";this.salarySlipDownloadData.selectedyear="";
        })
  }
  rerender(): void
  {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if(dtElement.dtInstance!=undefined)
      {
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          dtElement.dtTrigger.next();
          });
      }
      });
  }
}
