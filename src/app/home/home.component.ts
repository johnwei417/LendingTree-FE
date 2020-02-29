import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {User} from '../_models';
import {AuthenticationService, UserService} from '../_services';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']

})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];


  constructor(private userService: UserService, private authenticationService: AuthenticationService) {
  }


  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.authenticationService.loggedIn.next(true);
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

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.getUsers();
    });
  }

  getUsers() {
    this.userService.getAll().subscribe(data => this.users = data['result']);
  }
}
