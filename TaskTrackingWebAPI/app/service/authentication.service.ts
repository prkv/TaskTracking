import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IUser } from '../models/user'
import { UserService } from '../service/user.service'

@Injectable()
export class AuthenticationService {

    public token: string;

    private loggedIn = new BehaviorSubject<boolean>(false); 

    
    
    get isLoggedIn() {
        
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn.next(true);
        }
        else {
            this.loggedIn.next(false);
        }

        return this.loggedIn.asObservable(); 
    }

    constructor(private http: Http, private _userService: UserService) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(username: string, password: string) {

        let body = 'username='+ username + '&password=' + password + '&grant_type=password';
        let headers = new Headers({ 'Content-Type': ' application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('/oauth2/token', body, options )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().access_token;
                if (token) {
                    // set token property
                    this.token = token;
                    this.loggedIn.next(true);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    return true;
                }
                else {
                    return false;
                }
                
            }).catch(this.handleError);
    }
 
    logout() {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.loggedIn.next(false);

        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('loggedInUser');
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Invalid User Credentials');
    }

    
}