import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {MapComponent} from './map/map.component';
import {BranchesComponent} from './branches/branches.component';
import {PaymentComponent} from './payment/payment.component';
import {NewUserComponent} from './new-user/new-user.component';
// import { app } from  './app.component';
const routes: Routes = [
  {
    component:  DashboardComponent,
    path: 'map'
  },
  {
    component:  LoginComponent,
    path: 'login'
  },
  {
    component:  MapComponent,
    path: 'dashboard'
  },
  {
    component:  BranchesComponent,
    path: 'branches'
  },
  {
    component:  PaymentComponent,
    path: 'payment'
  },
  {
    component:  NewUserComponent,
    path: 'newuser'
  },
  {
    path: 'map',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
