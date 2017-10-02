import { NgModule, LOCALE_ID } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './components/home.component';
import { TaskService} from './service/task.service'
import { TaskComponent } from './components/task.component';

import { MovieService } from './service/movie.service'
import { MovieComponent } from './components/movie.component';
import { HeaderComponent } from './header/header.component'

import { UserService } from './service/user.service'
import { LoginComponent } from './login/login.component';

import { AuthenticationService } from './service/authentication.service'

import { AuthGuard } from './guards/auth.guard';

import { DateValueAccessorModule } from './shared/module';


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule, DateValueAccessorModule],
    declarations: [AppComponent, HomeComponent, TaskComponent, MovieComponent, LoginComponent, HeaderComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: LOCALE_ID, useValue: "en-GB" }, TaskService, MovieService, UserService, AuthenticationService, AuthGuard],
    bootstrap: [AppComponent]
})

export class AppModule { }