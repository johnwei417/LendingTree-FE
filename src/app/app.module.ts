import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


import {AppComponent} from './app.component';
import {routing} from './app-routing.module';

import {AlertComponent} from './_directives';
import {AuthGuard} from './_guards';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {AlertService, AuthenticationService, EmployeeService, LoanService, UserService} from './_services';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {LoanManageComponent} from './admin/loans';
import {CustomerLoanComponent} from './customer/viewLoans';
import {NavigationComponent} from './navigation/navigation.component';
import {NavSideComponent} from './nav-side/nav-side.component';
import {AddLoanComponent} from './customer/addLoans/addLoan.component';
import {ViewEmployeeComponent} from './admin/employee/viewEmployee.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
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
    NavigationComponent,
    NavSideComponent,
    ViewEmployeeComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    LoanService,
    EmployeeService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},


  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
