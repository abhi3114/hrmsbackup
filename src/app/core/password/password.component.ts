import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute} from '@angular/router';
import { PasswordService } from './password.service';
import {Observable} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  resetPasswordData = { password:'', password_confirmation:'', reset_password_token: '' };
  resetPasswordForm: FormGroup;
  isLoading: boolean;

  constructor(private route: ActivatedRoute, private router:Router,private api:PasswordService,public toastr: ToastrManager) {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      password_confirmation:  new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.resetPasswordData.reset_password_token = this.route.snapshot.queryParams.reset_password_token
  }
  validateResetPasswordForm(){
    this.isLoading=true;
    this.api.updatePassword(this.resetPasswordData).subscribe(res => {
      this.isLoading=false;
      this.resetPasswordForm.reset();
      this.router.navigateByUrl('/login');
      this.toastr.successToastr('Your Password has Been Reset', '', {  position: 'top-center'});
      },(err) => {
        this.showError(err.error);
        this.isLoading=false;
        this.resetPasswordForm.reset();
    });
  }

  showError(e,position: any = 'top-center') {
    this.toastr.errorToastr(e.message, 'Oops Some went wrong!',{  position: position});
  }

}
