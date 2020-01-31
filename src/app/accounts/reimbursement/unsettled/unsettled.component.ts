import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable,Subject } from 'rxjs';
import { MonthYearService } from '../../../shared/service/month-year.service';
import { CommonSalaryService } from '../../../shared/service/common-salary.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { UnsettledService } from './unsettled.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-unsettled',
  templateUrl: './unsettled.component.html',
  styleUrls: ['./unsettled.component.css']
})
export class UnsettledComponent implements OnInit {

  filterdataform:FormGroup;
  monthArray:any;yearArray:any;filteredData:any;
  unsettled_filter={selectedmonth:'',selectedyear:''};
  unsettledOptions: DataTables.Settings = {};
  unsettledTableTrigger: Subject<any> = new Subject();
  unsettle_api_data:any=[];
  single_user_unsettled_data:any[];
  single_user_single_unsettled_data:any[];
  splitmonthyear:any=[];
  userssetttledmodalRef:BsModalRef;
  singleusersingledataModalRef:BsModalRef;


  constructor(private monthandyear:MonthYearService,private commonsalary:CommonSalaryService,private api:UnsettledService,public toastr: NotificationService,private modalService: BsModalService) {

    this.unsettledOptions= {
      pagingType: 'full_numbers',
      lengthMenu: [[10, 20, 50, -1],
      [10, 20, 50, "All"]]
    };
    
    this.monthArray=this.monthandyear.populateMonth();
    this.yearArray=this.monthandyear.populateYear();
    this.filteredData=this.commonsalary.getMonthandYear();
    this.unsettled_filter.selectedmonth=this.filteredData.selectedmonth;
    this.unsettled_filter.selectedyear= this.filteredData.selectedyear;

    this.filterdataform = new FormGroup({
      filtermonth: new FormControl('', [Validators.required]),
      filteryear: new FormControl('', [Validators.required]),
    });

    this.getFilterData();

  }

  ngOnInit() {
  }
  
    getFilterData()
  {    
    var year;var month;
    $('#unsettledDataTables').DataTable().destroy();
    this.filterdataform.controls.filteryear.value == "" ? year = this.unsettled_filter.selectedyear : year =
    this.filterdataform.controls.filteryear.value    
    this.filterdataform.controls.filtermonth.value == "" ? month = this.unsettled_filter.selectedmonth : month =
    this.filterdataform.controls.filtermonth.value
    console.log(year,month)
    this.api.getUnSettledReimbursementUsers(year,month).subscribe((res:any) => {
    this.unsettle_api_data=res;
    this.unsettledTableTrigger.next();
    }, (err) => {
    this.toastr.showError(err.error);
    });
    console.log(this.unsettle_api_data)
  }

  
  userunsettledList(template: TemplateRef<any>,s)
  {
    this.userssetttledmodalRef = this.modalService.show(template);
    var year;var month;
    this.filterdataform.controls.filteryear.value == "" ? year = this.unsettled_filter.selectedyear : year =
    this.filterdataform.controls.filteryear.value    
    this.filterdataform.controls.filtermonth.value == "" ? month = this.unsettled_filter.selectedmonth : month =
    this.filterdataform.controls.filtermonth.value
    var user_id=s.user_id;
    this.api.getSinghleUserUnsettledData(year,month, user_id).subscribe((res:any) => {
    this.single_user_unsettled_data=res.reimbursements;
    }, (err) => {
    this.toastr.showError(err.error);
    });
  }

  singleusersingleunsettleddata(template: TemplateRef<any>,s)
  {
    this.singleusersingledataModalRef=this.modalService.show(template);
    this.single_user_single_unsettled_data=s;
    console.log(s.receipt)
    console.log(s)
    var spiltmonthandyear=(s.display_month_year).split('-');
    this.splitmonthyear=spiltmonthandyear;    
  }
  closesingleusersingledatamodal()
  {
    this.singleusersingledataModalRef.hide();
  }


}
