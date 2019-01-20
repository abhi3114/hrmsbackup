import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/service/notification.service';
import { ResetPasswordService } from './reset-password.service';


@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
	resetPasswordForm: FormGroup;
	resetPasswordData={current_password:'',new_password:'',confirm_password:''};user_data:any;

	constructor(private router:Router,private api:ResetPasswordService,public toastr: NotificationService) 
	{
		this.resetPasswordForm = new FormGroup({
			current_password: new FormControl('', [Validators.required]),
			new_password: new FormControl('', [Validators.required]),
			confirm_password: new FormControl('', [Validators.required])
		});
	}

	validateResetPassword()
	{
		if(this.resetPasswordData.new_password == this.resetPasswordData.confirm_password)
		{
			var postData={
				"current_password":this.resetPasswordData.current_password,
				"new_password":this.resetPasswordData.new_password
			}
			this.api.resetpassword(postData).subscribe(res => {
				this.user_data=res;
				if(this.user_data.status==false)
				{
					this.toastr.showError(this.user_data.mesaage);
					this.resetPasswordForm.reset();
				}
				else
				{
					this.toastr.showSuccess("Password Reset Successfully");
					this.router.navigateByUrl('/login');
				}

			},(err) => {
				this.toastr.showError(err.error);
				this.resetPasswordForm.reset();
			});
		}
		else
		{
			this.toastr.CustomErrorMessage("new password mismatched with confirm password");
		}
		
	}


	ngOnInit() {
	}

}
