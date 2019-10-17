import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LaddaModule } from 'angular2-ladda';
import { PasswordComponent } from './password/password.component';
const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login',component: LoginComponent },
{ path: 'password/edit', component: PasswordComponent }
];

@NgModule({
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  ToastrModule.forRoot(),
  RouterModule.forRoot(routes),
  HttpClientModule,
  LaddaModule,
  ],
  declarations: [LoginComponent, PasswordComponent],
  exports: [
  LoginComponent,
  RouterModule
  ]
  })
export class CoreModule { }
