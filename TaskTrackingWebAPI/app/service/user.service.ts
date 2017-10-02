import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { IUser } from '../models/user';
import { Global } from '../shared/global';
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }
 
    getAll() {
        return this.http.get('/api/userapi', this.jwt()).map((response: Response) => response.json());
    }
 
    getById(username: string) {
        return this.http.get('/api/userapi/' + username, this.jwt()).map((response: Response) => response.json());
    }
     
    // private helper methods
    public jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
    
}