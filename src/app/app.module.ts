import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { ManagersModule } from './managers/managers.module';
import { AccountsModule } from './accounts/accounts.module';
import { MyInterceptor } from './request-interceptors';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    CoreModule,
    UsersModule,
    AccountsModule,
    AppRoutingModule
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptor,
    multi: true
    }],
    bootstrap: [AppComponent]
    })
export class AppModule { }
