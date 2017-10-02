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
var router_1 = require("@angular/router");
var authentication_service_1 = require("../service/authentication.service");
var user_service_1 = require("../service/user.service");
var LoginComponent = (function () {
    function LoginComponent(route, router, authenticationService, _userService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this._userService = _userService;
        this.model = {};
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(function (data) {
            _this.loadUser();
            _this.router.navigate(['']);
        }, function (error) {
            _this.msg = 'Invalid User Name or Password';
            //console.error(error);
            _this.loading = false;
        });
    };
    LoginComponent.prototype.loadUser = function () {
        //Now get the actual user object
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            var userName = currentUser.username;
            if (userName) {
                this._userService.getById(userName)
                    .subscribe(function (data) {
                    localStorage.setItem('loggedInUser', JSON.stringify(data));
                }, function (error) {
                    console.error(error);
                });
            }
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'login.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        authentication_service_1.AuthenticationService, user_service_1.UserService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map