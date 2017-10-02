import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

import { TaskComponent } from './components/task.component';

const appRoutes: Routes = [    
    //{ path: '', redirectTo: 'home', pathMatch: 'full', },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},    
    { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


 
//{ path: '', component: HomeComponent, canActivate: [AuthGuard] },    
//{ path: 'task', component: TaskComponent, canActivate: [AuthGuard] },