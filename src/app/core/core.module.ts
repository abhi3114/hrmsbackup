import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [LoginComponent],
  exports: [
    LoginComponent
  ]
})
export class CoreModule { }
