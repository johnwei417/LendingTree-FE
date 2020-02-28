import {RouterModule, Routes} from '@angular/router';


import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AuthGuard} from './_guards';
import {LoanManageComponent} from './admin/loans';
import {CustomerLoanComponent} from './customer/viewLoans';
import {AddLoanComponent} from './customer/addLoans/addLoan.component';
import {ViewEmployeeComponent} from './admin/employee/viewEmployee.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'admin/loans', component: LoanManageComponent, canActivate: [AuthGuard]},
  {path: 'customer/loan', component: CustomerLoanComponent, canActivate: [AuthGuard]},
  {path: 'customer/addLoan', component: AddLoanComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'admin/viewCustomers', component: ViewEmployeeComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
