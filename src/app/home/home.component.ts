import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({
    templateUrl: 'home.component.html',
    styleUrls : ['home.component.css']

})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }


    ngOnInit() {
        this.getUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.getUsers() 
        });
    }

    getUsers(){
       this.userService.getAll().subscribe(data => this.users = data['result'])
    }
}