"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var user_service_1 = require("../service/user.service");
var AuthenticationService = (function () {
    function AuthenticationService(http, _userService) {
        this.http = http;
        this._userService = _userService;
        this.loggedIn = new BehaviorSubject_1.BehaviorSubject(false);
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    Object.defineProperty(AuthenticationService.prototype, "isLoggedIn", {
        get: function () {
            if (localStorage.getItem('currentUser')) {
                // logged in so return true
                this.loggedIn.next(true);
            }
            else {
                this.loggedIn.next(false);
            }
            return this.loggedIn.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        var body = 'username=' + username + '&password=' + password + '&grant_type=password';
        var headers = new http_1.Headers({ 'Content-Type': ' application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('/oauth2/token', body, options)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().access_token;
            if (token) {
                // set token property
                _this.token = token;
                _this.loggedIn.next(true);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                return true;
            }
            else {
                return false;
            }
        }).catch(this.handleError);
    };
    AuthenticationService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.loggedIn.next(false);
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('loggedInUser');
    };
    AuthenticationService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Invalid User Credentials');
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, user_service_1.UserService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map