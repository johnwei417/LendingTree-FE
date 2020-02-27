import {faBell, faSearch, faUser} from '@fortawesome/free-solid-svg-icons';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../_services';
import {User} from '../_models';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  faSearch = faSearch;
  faBell = faBell;
  faUser = faUser;
  currentUser: User;
  isLoggedIn$: Observable<boolean>;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authenticationService.isLoggedIn;
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
}
