import {RouterModule, Routes} from '@angular/router';


import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AuthGuard} from './_guards';
import {LoanManageComponent} from './admin/loans/AllLoans';
import {CustomerLoanComponent} from './customer/viewLoans';
import {EmployeeLoanComponent} from './employee/viewLoans';
import {AddLoanComponent} from './customer/addLoans/addLoan.component';
import {ViewEmployeeComponent} from './admin/employee/viewEmployees/viewEmployee.component';
import {ViewCustomersComponent} from './admin/customers/viewCustomers';
import {AddEmployeeComponent} from './admin/employee/addEmployee';
import {ActiveLoansComponent} from './admin/loans/ActiveLoans';
import {PendingLoansComponent} from './admin/loans/PendingLoans';
import {RejectedLoansComponent} from './admin/loans/RejectedLoans';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'admin/loans', component: LoanManageComponent, canActivate: [AuthGuard]},
  {path: 'customer/loan', component: CustomerLoanComponent, canActivate: [AuthGuard]},
  {path: 'employee/loan', component: EmployeeLoanComponent, canActivate: [AuthGuard]},
  {path: 'customer/addLoan', component: AddLoanComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'admin/viewEmployees', component: ViewEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'admin/viewCustomers', component: ViewCustomersComponent, canActivate: [AuthGuard]},
  {path: 'admin/addEmployees', component: AddEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'admin/activeLoans', component: ActiveLoansComponent, canActivate: [AuthGuard]},
  {path: 'admin/pendingLoans', component: PendingLoansComponent, canActivate: [AuthGuard]},
  {path: 'admin/rejectedLoans', component: RejectedLoansComponent, canActivate: [AuthGuard]},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
