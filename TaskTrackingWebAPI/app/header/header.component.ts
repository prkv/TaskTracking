import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../service/authentication.service';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';
import { IUser } from '../models/user';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
    
})
export class HeaderComponent implements OnInit {

    isLoggedIn$: Observable<boolean>;                  

    
    constructor(private authService: AuthenticationService, private _userService: UserService) { }

    ngOnInit() {
        
        this.isLoggedIn$ = this.authService.isLoggedIn;
       
        
    }

    public loggedInUserDetails() {
         var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            return "Logged as:" + loggedInUser.FirstName + ' ' + loggedInUser.LastName;
         }
        else {
            return "";
        }
    }

    onLogout() {
        this.authService.logout();                      
    }

    
}