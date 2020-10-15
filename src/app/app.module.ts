import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { BranchesComponent } from './branches/branches.component';
import { PaymentComponent } from './payment/payment.component';
import { NewUserComponent } from './new-user/new-user.component';
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MapComponent,
    BranchesComponent,
    PaymentComponent,
    NewUserComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
