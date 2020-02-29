import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {User} from '../_models';
import {AuthenticationService, UserService} from '../_services';
import {Observable} from 'rxjs';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']

})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  isLoggedIn$: Observable<boolean>;

  constructor(private userService: UserService, private authenticationService: AuthenticationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }


  ngOnInit() {
    //  this.getUsers();
    this.authenticationService.loggedIn.next(true);
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
