import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, ErrorHandler } from '@angular/core';
import * as Sentry from "@sentry/browser";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ViewtaskComponent } from './task/viewtask/viewtask.component';
import { AddtaskComponent } from './task/addtask/addtask.component';
// import { UpdatetaskComponent } from './task/updatetask/updatetask.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpInterceptorService} from './service/http-interceptor.service';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddprojectComponent } from './project/addproject/addproject.component';
import { AdduserComponent } from './user/adduser/adduser.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSearchComponent } from './project/modal/user-search/user-search.component';
import { ProjectSearchComponent } from './task/addtask/modal/project-search/project-search.component';

//Init sentry with our dsn key to log the logs in sentry
Sentry.init({
  dsn: "https://d55a54047dd94ebaab13f8c9bc01f9c0@sentry.io/1478190"
});

//setup custom config to capture the user info to log
Sentry.configureScope((scope)=>{
  scope.setUser({'email':'dsvasan2002@gmail.com'});
})

@Injectable()
//pass error handler to sentry
export class SentryErrorHandler implements ErrorHandler {
  constructor(){}
  handleError(error: any) {
    Sentry.captureException(error.originalError || error);
    Sentry.captureEvent(error.originalError || error);
    throw error;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ViewtaskComponent,
    AddtaskComponent,
    AddprojectComponent,
    AdduserComponent,
    UserSearchComponent,
    ProjectSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    {provide: ErrorHandler, useClass: SentryErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
