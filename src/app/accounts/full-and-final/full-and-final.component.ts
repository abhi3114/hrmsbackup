import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NotificationService } from '../../shared/service/notification.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import * as _ from 'underscore';
import { FullAndFinalService } from './full-and-final.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import { CustomPdfService } from '../../shared/service/custom-pdf.service';
import { CommonSalaryService } from '../../shared/service/common-salary.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-full-and-final',
  templateUrl: './full-and-final.component.html',
  styleUrls: ['./full-and-final.component.css']
  })
export class FullAndFinalComponent implements OnInit {
  salaryTableOptions: DataTables.Settings = {};
  salaryTableTrigger: Subject<any> = new Subject();
  salary_filter={selectedmonth:'',selectedyear:''};
  user_data:any;  monthArray:any;yearArray:any;filteredData:any;salary_data:any;pdf:any;pdfObj:any;
  section:any;process_data:any;message:any;
  modalRef: BsModalRef;Section='fullandfinal'; isLoading : boolean=false;
  config = {
    animated:true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class:'modal-md'
  };
  constructor(private router:Router,private api:FullAndFinalService,private monthandyear:MonthYearService,private modalService: BsModalService,public toastr: NotificationService,private pdfservice:CustomPdfService,private commonsalary:CommonSalaryService)
  {
    this.salaryTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[-1,50, 100, 150, 200],
      ["All",50, 100, 150, 200 ]],
    };
    this.api.getallUser().subscribe(res => {
      this.user_data=res;
      this.salaryTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });
    this.monthArray=this.monthandyear.populateMonth();
    this.yearArray=this.monthandyear.populateYear();
    this.filteredData=this.commonsalary.getMonthandYear();
    this.salary_filter.selectedmonth=this.filteredData.selectedmonth;
    this.salary_filter.selectedyear= this.filteredData.selectedyear;
    localStorage.setItem('section','fullandfinal');
  }

  process(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);
  }

  checkALL()
  {
    if ($('.check-box:checked').length > 0)
    $('.checkbox').prop('checked', true);
    else
    $('.checkbox').prop('checked', false);
  };
  confirm()
  {
    var userIds= []; this.isLoading=true;

    $('.checkbox:checked').each(function() {
      var id=$(this).attr('name')
      userIds.push(id);
      });
    var postdata =
    {
      "user_ids":  userIds,
    }
    if(userIds != undefined && userIds.length != 0)
    {
      this.api.processSalary(this.salary_filter.selectedmonth,this.salary_filter.selectedyear,postdata).subscribe(res => {
        this.process_data=res;
        this.toastr.showSuccess('Salary Processed');
        this.modalRef.hide();
        this.getAllUser();
        this.isLoading=false;
        }, (err) =>
        {
          this.toastr.showError(err.error);this.isLoading=false;
          });
    }
    else
    {
      this.toastr.CustomErrorMessage('Please check atleast one user for processing salary');
      this.modalRef.hide();this.isLoading=false;
    }
  }

  decline()
  {
    this.modalRef.hide();
  }

  getAllUser()
  {
    this.api.getallUser().subscribe(res => {
      this.user_data=res;
      }, (err) => {
        this.toastr.showError(err.error);
        });
  }

  downloadSalarySlip(user_id,user_name)
  {
    this.api.getUserPayemntDetails(user_id,this.salary_filter.selectedmonth,this.salary_filter.selectedyear).subscribe(res => {
      this.salary_data=res;
      this.pdf = pdfMake;
      var monthname=_.find(this.monthArray,{id : parseInt(this.salary_filter.selectedmonth) }).name;
      var filename='Salaryslip_'+user_name+'_for_'+monthname+'_'+this.salary_filter.selectedyear;
      this.pdfObj=  this.pdf.createPdf(this.pdfservice.getSalarySlipPdf(this.salary_data,user_name));
      this.pdfObj.download(filename);
      this.toastr.showSuccess('Salary Downloaded');
      }, (err) =>
      {
        this.toastr.showError(err.error);
        });
  }

  ngOnInit() {
  }
  convertAmountintoCurrency(number)
  {
    if(number!=undefined)
    {
      var n=number.toLocaleString('en-IN', {
        currency: 'INR',
        maximumFractionDigits: 0
        });
      return n;
    }

  }
}
