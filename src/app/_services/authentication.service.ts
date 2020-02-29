import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, {username: username, password: password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.result.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user.result));
          this.loggedIn.next(true);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
  }
}
