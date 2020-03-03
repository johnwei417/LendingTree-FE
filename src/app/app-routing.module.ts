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
import {EditEmployeeComponent} from './admin/employee/editEmployee';
import {EditCustomerComponent} from './admin/customers/editCustomers';
import {ViewCustomerLoansComponent} from './admin/customers/viewLoans';
import {AdminProfileComponent} from './admin/profile/adminProfile.component';
import {CustomerActiveLoansComponent} from './customer/ActiveLoans';
import {CustomerPendingLoansComponent} from './customer/PendingLoans';
import {CustomerRejectedLoansComponent} from './customer/RejectedLoans';
import {CustomerProfileComponent} from './customer/profile/customerProfile.component';
import {EmployeeProfileComponent} from './Employee/profile/employeeProfile.component';
import {ViewDepartmentsComponent} from './admin/department/viewDepartments';
import {AddDepartmentComponent} from './admin/department/addDepartment/addDepartment.component';
import {EditDepartmentComponent} from './admin/department/editDepartment';

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
  {path: 'admin/viewEmployees/edit', component: EditEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'admin/viewCustomers/edit', component: EditCustomerComponent, canActivate: [AuthGuard]},
  {path: 'admin/viewCustomers/loans', component: ViewCustomerLoansComponent, canActivate: [AuthGuard]},
  {path: 'admin/profile', component: AdminProfileComponent, canActivate: [AuthGuard]},
  {path: 'customer/loans/active', component: CustomerActiveLoansComponent, canActivate: [AuthGuard]},
  {path: 'customer/loans/pending', component: CustomerPendingLoansComponent, canActivate: [AuthGuard]},
  {path: 'customer/loans/rejected', component: CustomerRejectedLoansComponent, canActivate: [AuthGuard]},
  {path: 'customer/profile', component: CustomerProfileComponent, canActivate: [AuthGuard]},
  {path: 'employee/profile', component: EmployeeProfileComponent, canActivate: [AuthGuard]},
  {path: 'admin/viewDepartments', component: ViewDepartmentsComponent, canActivate: [AuthGuard]},
  {path: 'admin/addDepartment', component: AddDepartmentComponent, canActivate: [AuthGuard]},
  {path: 'admin/viewDepartments/edit', component: EditDepartmentComponent, canActivate: [AuthGuard]},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
