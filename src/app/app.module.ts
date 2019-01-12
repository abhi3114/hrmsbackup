import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { ManagersModule } from './managers/managers.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    UsersModule,
    ManagersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
