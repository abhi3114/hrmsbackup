import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from './master.service';
import {Observable} from 'rxjs';
import { NotificationService } from '../../service/notification.service';
@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
  })
export class MasterComponent implements OnInit {
  employee_name:any;employee_photo:any;employee_department:any;employee_email:any;employee_role:any;
  user_data:any;
  constructor(private router:Router,private api:MasterService,public toastr: NotificationService)
  {
    console.log('master called');
    this.employee_name=localStorage.getItem('employee_name');
    this.employee_photo=localStorage.getItem('employee_photo');
    this.employee_department=localStorage.getItem('employee_department');
    this.employee_email=localStorage.getItem('employee_email');
    this.employee_role=localStorage.getItem('employee_role');
  }

  signOut()
  {
    this.api.logout().subscribe(res => {
      this.user_data=res;
      localStorage.clear();
      this.router.navigateByUrl('/login');
      }, (err) => {
        this.toastr.showError(err.error);
        });

  }

  ngOnInit() {
  }

}
