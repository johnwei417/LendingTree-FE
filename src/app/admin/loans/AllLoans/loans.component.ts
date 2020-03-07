import {Component, OnInit} from '@angular/core';
import {Department, Loan, User} from '../../../_models';
import {AuthenticationService, DepartmentService, LoanService} from '../../../_services';
import {first} from 'rxjs/operators';
import {Location} from '@angular/common';


@Component({
  templateUrl: 'loans.component.html',
  styleUrls: ['loans.component.css'],
})
export class LoanManageComponent implements OnInit {
  currentUser: User;
  loans: Loan[];
  departments: Department[];
  departmentName: string;
  searchText;

  constructor(private location: Location, private loanService: LoanService, private departmentService: DepartmentService,
              private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.getLoans();
    this.getDepartments();
    this.authenticationService.loggedIn.next(true);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser.role[0] === 'ROLE_ADMIN') {
      this.authenticationService.admin.next(true);
    } else {
      this.authenticationService.admin.next(false);
    }

    if (this.currentUser.role[0] === 'ROLE_CUSTOMER') {
      this.authenticationService.customer.next(true);
    } else {
      this.authenticationService.customer.next(false);
    }

    if (this.currentUser.role[0] !== 'ROLE_CUSTOMER' && this.currentUser.role[0] !== 'ROLE_ADMIN') {
      this.authenticationService.employee.next(true);
    } else {
      this.authenticationService.employee.next(false);
    }
  }

  backClicked() {
    this.location.back();
  }

  getDepartments() {
    this.departmentService.getAllDepartments().subscribe(data => this.departments = data['result']);
  }

  getLoans() {
    this.loanService.getAll().subscribe(data => this.loans = data['result']);
  }

  assign(loanid: number) {
    if (window.confirm('Are sure you want to assign this loan to pickup department ?')) {
      let loan: Loan = {
        id: loanid,
        userId: null,
        cusId: null,
        amount: null,
        deptId: null,
        bankId: null,
        loantypeId: null,
        loanstatusId: null
      };
      this.loanService.assignToPick(loan).pipe(first()).subscribe(() => {
        this.getLoans();
      });
    }
  }

}
