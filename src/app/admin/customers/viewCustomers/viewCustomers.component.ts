import {Component, OnInit} from '@angular/core';
import {Customer, User} from '../../../_models';
import {AuthenticationService, CustomerService} from '../../../_services';
import {Location} from '@angular/common';
import {first} from 'rxjs/operators';

@Component({
  templateUrl: 'viewCustomers.component.html',
  styleUrls: ['viewCustomers.component.css']
})

export class ViewCustomersComponent implements OnInit {
  currentUser: User;
  customers: Customer[] = [];
  searchText;

  constructor(private location: Location, private customerService: CustomerService, private authenticationService: AuthenticationService) {
  }


  ngOnInit() {
    this.getCustomers();
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

  getCustomers() {
    this.customerService.getAllCustomer().subscribe(data => this.customers = data['result']);
  }

  deleteCustomer(id: number) {
    if (window.confirm('Are sure you want to delete this customer ?')) {
      this.customerService.deleteById(id).pipe(first()).subscribe(() => {
        this.getCustomers();
      });
    }
  }
}
