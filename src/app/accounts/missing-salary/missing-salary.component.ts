import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { NotificationService } from '../../shared/service/notification.service';
import { MissingSalaryService } from './missing-salary.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import { CommonSalaryService } from '../../shared/service/common-salary.service';
@Component({
  selector: 'app-missing-salary',
  templateUrl: './missing-salary.component.html',
  styleUrls: ['./missing-salary.component.css']
  })
export class MissingSalaryComponent implements OnInit {
  salaryTableOptions: DataTables.Settings = {};
  salaryTableTrigger: Subject<any> = new Subject();
  monthArray:any;yearArray:any;filteredData:any;
  salary_filter={selectedmonth:'',selectedyear:''};
  user_data:any;
  constructor(private router:Router,private api:MissingSalaryService,private monthandyear:MonthYearService,private route: ActivatedRoute,private commonsalary:CommonSalaryService,public toastr: NotificationService)
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
    localStorage.setItem('section','salary');
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

  ngOnInit() {
  }

}
