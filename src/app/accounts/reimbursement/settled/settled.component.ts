import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable,Subject } from 'rxjs';
import { MonthYearService } from '../../../shared/service/month-year.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { SettledService } from './settled.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as moment from 'moment';

@Component({
  selector: 'app-settled',
  templateUrl: './settled.component.html',
  styleUrls: ['./settled.component.css']
})
export class SettledComponent implements OnInit {

	filterdataform:FormGroup;
  monthArray:any;yearArray:any;
  settled_filter:any={selectedmonth:'',selectedyear:''};
  settledOptions: DataTables.Settings = {};
  settledTableTrigger: Subject<any> = new Subject();
  settle_api_data:any=[];
  single_user_settled_data:any[];
  single_user_single_settled_data:any[];
  splitmonthyear:any[];
  attachedbill:boolean=false;
  userssetttledmodalRef:BsModalRef;
  singleusersingledataModalRef:BsModalRef;
  //loading is for tables
  loading:boolean=false;
  //singleuserloading is for single user record table
  singleuserloading:boolean=false;

  constructor(private monthandyear:MonthYearService,private api:SettledService,public toastr: NotificationService,private modalService: BsModalService) {

  	this.settledOptions= {
    pagingType: 'full_numbers',
    lengthMenu: [[10, 20, 50, -1],
    [10, 20, 50, "All"]]
    };

    this.monthArray=this.monthandyear.populateMonth();
    this.yearArray=this.monthandyear.populateYear();
    this.settled_filter.selectedmonth=moment().month()+1;
    this.settled_filter.selectedyear=moment().year();

    this.filterdataform = new FormGroup({
      filtermonth: new FormControl('', [Validators.required]),
      filteryear: new FormControl('', [Validators.required]),
    });

    this.getFilterData()

   }

  ngOnInit() {
  }


  getFilterData()
  {    
    var year;var month;
    $('#settledDataTables').DataTable().destroy();
    this.filterdataform.controls.filteryear.value == "" ? year = this.settled_filter.selectedyear : year =
    this.filterdataform.controls.filteryear.value    
    this.filterdataform.controls.filtermonth.value == "" ? month = this.settled_filter.selectedmonth : month =
    this.filterdataform.controls.filtermonth.value
    //console.log(year,month)
    this.loading=true;
    this.api.getSettledReimbursementUsers(year,month).subscribe((res:any) => {
    this.settle_api_data=res;
    this.settledTableTrigger.next();
    this.loading=false;
    }, (err) => {
    this.toastr.showError(err.error);
    this.loading=false;
    });
  }

  usersettledlist(template: TemplateRef<any>,s)
  {
    this.userssetttledmodalRef = this.modalService.show(template);
    var year;var month;
    this.filterdataform.controls.filteryear.value == "" ? year = this.settled_filter.selectedyear : year =
    this.filterdataform.controls.filteryear.value    
    this.filterdataform.controls.filtermonth.value == "" ? month = this.settled_filter.selectedmonth : month =
    this.filterdataform.controls.filtermonth.value
    var user_id=s.user_id;
    this.singleuserloading=true;
    this.api.getSinghleUserSettledData(year,month, user_id).subscribe((res:any) => {
    this.single_user_settled_data=res.reimbursements;
    this.singleuserloading=false;
    }, (err) => {
    this.toastr.showError(err.error);
    this.singleuserloading=false;
    });
  }

  singleusersinglesettleddata(template: TemplateRef<any>,s)
  {
    this.singleusersingledataModalRef=this.modalService.show(template);
    this.single_user_single_settled_data=s;
    if(s.receipt_path==null || s.receipt_path=="undefined" || s.receipt_path=="")
    {
      this.attachedbill=true;
    }
    else
    {
      this.attachedbill=false;
    }
    var spiltmonthandyear=(s.display_month_year).split('-');
    this.splitmonthyear=spiltmonthandyear;
  }
  closesingleusersingledatamodal()
  {
    this.singleusersingledataModalRef.hide();
  }

}
