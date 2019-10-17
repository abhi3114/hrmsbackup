import { Component, TemplateRef, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
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
  resetPasswordForm:FormGroup;
  resetPasswordData={email:''};
  user_data:any;isLoading: boolean = false;show: boolean; isLoadingResetPassword: boolean = false;
  modalRef: BsModalRef;
  constructor(private router:Router,private api:LoginService,public toastr: ToastrManager, private modalService: BsModalService) {
    this.signupform = new FormGroup({
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+[a-zA-Z\s0-9._-]+@[a-zA-Z\sa-z0-9-]+\.[a-zA-Z\s.]{2,20}$/i)]),
      });
    this.show = false;
    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required])
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
      localStorage.setItem('can_access_manager', this.user_data.data.can_access_manager_section);
      localStorage.setItem('can_access_accounts', this.user_data.data.can_access_accounts);
      this.router.navigateByUrl('/home/dashboard');
      this.isLoading=false;
      },(err) => {
        this.showError(err.error);
        this.isLoading=false;
        });
  }

  updatePasswordResponse(template: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(template);
  }

  resetUserPassword(){
    this.isLoadingResetPassword = true;
    this.api.sendResetPasswordLink(this.resetPasswordData).subscribe(res => {
      this.isLoadingResetPassword = false;
      this.modalRef.hide();
      this.toastr.successToastr('Reset Password Link Has been Sent to your Email', '', {  position: 'top-center'});
      this.resetPasswordForm.reset();
      }, (err) => {
      this.showError(err.error);
      this.modalRef.hide();
      this.resetPasswordForm.reset();
    });
  }


  showError(e,position: any = 'top-center') {
    this.toastr.errorToastr(e.message, 'Oops Some went wrong!',{  position: position});
  }
  viewPassword()
  {
    this.show = !this.show;
  }
}
