"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home.component");
var login_component_1 = require("./login/login.component");
var auth_guard_1 = require("./guards/auth.guard");
var task_component_1 = require("./components/task.component");
var appRoutes = [
    //{ path: '', redirectTo: 'home', pathMatch: 'full', },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'task', component: task_component_1.TaskComponent, canActivate: [auth_guard_1.AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//{ path: '', component: HomeComponent, canActivate: [AuthGuard] },    
//{ path: 'task', component: TaskComponent, canActivate: [AuthGuard] }, 
//# sourceMappingURL=app.routing.js.map