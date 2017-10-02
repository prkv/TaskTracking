import { Component } from "@angular/core";

import { IUser } from '../models/user';
import { UserService } from '../service/user.service';

@Component({
    templateUrl: 'app/components/home.component.html'
})

export class HomeComponent{
    currentUser: IUser;

    constructor(private _userService: UserService) {
        
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
}