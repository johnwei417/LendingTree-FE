import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../_services';
import {User} from '../_models';
import {WeatherService} from '../_services/weather.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  currentUser: User;
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isCustomer$: Observable<boolean>;
  isEmployee$: Observable<boolean>;
  weather: any = {};


  constructor(private authenticationService: AuthenticationService, private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authenticationService.isLoggedIn;
    this.isAdmin$ = this.authenticationService.isAdmin;
    this.isCustomer$ = this.authenticationService.isCustomer;
    this.isEmployee$ = this.authenticationService.isEmployee;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getWeather();
  }

  getWeather() {
    return this.weatherService.getWeather().subscribe(data => this.weather = data);
  }

  onLogout() {
    this.authenticationService.logout();
  }
}
