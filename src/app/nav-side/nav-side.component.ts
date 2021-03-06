import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../_services';
import {User} from '../_models';

@Component({
  selector: 'app-nav-side',
  templateUrl: './nav-side.component.html',
  styleUrls: ['./nav-side.component.css']
})
export class NavSideComponent implements OnInit {
  currentUser: User;
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isCustomer$: Observable<boolean>;
  isEmployee$: Observable<boolean>;

  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authenticationService.isLoggedIn;
    this.isAdmin$ = this.authenticationService.isAdmin;
    this.isCustomer$ = this.authenticationService.isCustomer;
    this.isEmployee$ = this.authenticationService.isEmployee;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  onLogout() {
    this.authenticationService.logout();
  }

}
