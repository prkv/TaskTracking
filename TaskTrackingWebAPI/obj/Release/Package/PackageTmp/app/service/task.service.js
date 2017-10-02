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
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var TaskService = (function () {
    function TaskService(_http) {
        this._http = _http;
    }
    TaskService.prototype.get = function (url) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers = this.jwt(headers);
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.get(url, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TaskService.prototype.post = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers = this.jwt(headers);
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map(function (response) { return response; })
            .catch(this.handleError);
    };
    TaskService.prototype.put = function (url, id, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers = this.jwt(headers);
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url + id, body, options)
            .map(function (response) { return response; })
            .catch(this.handleError);
    };
    TaskService.prototype.delete = function (url, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers = this.jwt(headers);
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url + id, options)
            .map(function (response) { return response; })
            .catch(this.handleError);
    };
    TaskService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    TaskService.prototype.jwt = function (headers) {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            headers.append('Authorization', 'Bearer ' + currentUser.token);
            return headers;
        }
    };
    return TaskService;
}());
TaskService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map