"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var home_component_1 = require("./components/home.component");
var task_service_1 = require("./service/task.service");
var task_component_1 = require("./components/task.component");
var movie_service_1 = require("./service/movie.service");
var movie_component_1 = require("./components/movie.component");
var header_component_1 = require("./header/header.component");
var user_service_1 = require("./service/user.service");
var login_component_1 = require("./login/login.component");
var authentication_service_1 = require("./service/authentication.service");
var auth_guard_1 = require("./guards/auth.guard");
var module_1 = require("./shared/module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_1.routing, ng2_bs3_modal_1.Ng2Bs3ModalModule, module_1.DateValueAccessorModule],
        declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, task_component_1.TaskComponent, movie_component_1.MovieComponent, login_component_1.LoginComponent, header_component_1.HeaderComponent],
        providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, { provide: core_1.LOCALE_ID, useValue: "en-GB" }, task_service_1.TaskService, movie_service_1.MovieService, user_service_1.UserService, authentication_service_1.AuthenticationService, auth_guard_1.AuthGuard],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map