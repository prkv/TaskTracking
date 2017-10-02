import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';
import { IUser } from '../models/user';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    msg: string;
    loggedInUser: IUser;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService, private _userService: UserService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            data => {
                
                this.loadUser();
                this.router.navigate(['']);
            },
            error => {
                this.msg = 'Invalid User Name or Password';
                //console.error(error);
                this.loading = false;
            });
    }

    loadUser() {
        
        //Now get the actual user object
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            let userName = currentUser.username;
            if (userName) {

                this._userService.getById(userName)
                    .subscribe(
                    data => {
                        localStorage.setItem('loggedInUser', JSON.stringify(<IUser>data));
                    },
                    error => {

                        console.error(error);

                    });

            }
        }

    }

    
}