import {RouterModule, Routes} from '@angular/router';


import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AuthGuard} from './_guards';
import {LoanManageComponent} from './admin/loans';
import {CustomerLoanComponent} from './customer/viewLoans';
import {EmployeeLoanComponent} from './employee/viewLoans';
import {AddLoanComponent} from './customer/addLoans/addLoan.component';
import {ViewEmployeeComponent} from './admin/employee/viewEmployees/viewEmployee.component';
import {AddEmployeeComponent} from './admin/employee/addEmployee';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'admin/loans', component: LoanManageComponent, canActivate: [AuthGuard]},
  {path: 'customer/loan', component: CustomerLoanComponent, canActivate: [AuthGuard]},
  {path: 'employee/loan', component: EmployeeLoanComponent, canActivate: [AuthGuard]},
  {path: 'customer/addLoan', component: AddLoanComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'admin/viewEmployees', component: ViewEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'admin/addEmployees', component: AddEmployeeComponent, canActivate: [AuthGuard]},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
