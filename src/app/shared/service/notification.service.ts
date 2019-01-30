import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrManager) { }

  showError(e,position: any = 'top-center') {
    this.toastr.errorToastr(e.message, 'Oops Some went wrong!',{  position: position});
  }
  showSuccess(message,position: any = 'top-center') {
    this.toastr.successToastr(message, 'Success',{  position: position});
  }
  CustomErrorMessage(message, position: any = 'top-center' ){
    this.toastr.errorToastr(message, '', { position: position})
  }

}
