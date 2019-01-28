import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import {Observable} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  })
export class LoginComponent implements OnInit {
  signupform: FormGroup;
  loginData = { email:'', password:'' };
  user_data:any;isLoading: boolean = false;
  constructor(private router:Router,private api:LoginService,public toastr: ToastrManager) {
    this.signupform = new FormGroup({
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+[a-zA-Z\s0-9._-]+@[a-zA-Z\sa-z0-9-]+\.[a-zA-Z\s.]{2,20}$/i)]),
      });
  }

  ngOnInit() {
  }

  validateLoginForm()
  {
    this.isLoading=true;
    this.api.login(this.loginData).subscribe(res => {
      this.user_data=res;
      localStorage.setItem('token',this.user_data.data.token);
      localStorage.setItem('employee_name',this.user_data.data.name);
      localStorage.setItem('employee_photo',this.user_data.data.photo);
      localStorage.setItem('employee_department',this.user_data.data.department);
      localStorage.setItem('employee_email',this.user_data.data.email);
      localStorage.setItem('employee_role',this.user_data.data.role);
      localStorage.setItem('is_on_probation',this.user_data.data.is_on_probation);
      this.router.navigateByUrl('/home/dashboard');
      this.isLoading=false;
      },(err) => {
        this.showError(err.error);
        this.isLoading=false;
        });
  }
  showError(e,position: any = 'top-center') {
    this.toastr.errorToastr(e.message, 'Oops Some went wrong!',{  position: position});
  }
}
