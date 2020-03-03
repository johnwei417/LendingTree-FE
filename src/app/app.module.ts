import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


import {AppComponent} from './app.component';
import {routing} from './app-routing.module';
import {AlertComponent} from './_directives';
import {AuthGuard} from './_guards';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {AlertService, AuthenticationService, CustomerService, EmployeeService, LoanService, UserService} from './_services';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {LoanManageComponent} from './admin/loans/AllLoans';
import {CustomerLoanComponent} from './customer/viewLoans';
import {EmployeeLoanComponent} from './employee/viewLoans';
import {NavigationComponent} from './navigation/navigation.component';
import {NavSideComponent} from './nav-side/nav-side.component';
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
import {WeatherService} from './_services/weather.service';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LoanManageComponent,
    AddLoanComponent,
    CustomerLoanComponent,
    EmployeeLoanComponent,
    NavigationComponent,
    NavSideComponent,
    ViewEmployeeComponent,
    ViewCustomersComponent,
    AddEmployeeComponent,
    ActiveLoansComponent,
    PendingLoansComponent,
    RejectedLoansComponent,
    EditEmployeeComponent,
    EditCustomerComponent,
    ViewCustomerLoansComponent,
    AdminProfileComponent,
    CustomerActiveLoansComponent,
    CustomerPendingLoansComponent,
    CustomerRejectedLoansComponent,
    CustomerProfileComponent,
    EmployeeProfileComponent,
  ],
  providers: [
    AuthGuard,
    AlertService,
    WeatherService,
    AuthenticationService,
    UserService,
    LoanService,
    EmployeeService,
    CustomerService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},


  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
