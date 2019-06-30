import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as Sentry from "@sentry/browser";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ):Observable<HttpEvent<any>>{
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        if (error instanceof HttpErrorResponse) {
          //Server side error
          // console.log(error);
          Sentry.captureException(error);
          return throwError(error);
        } else {
          //Client side error
          // console.log(error);
          Sentry.captureException(error); 
          return throwError(error);
        }
      })
    )
  }
  constructor() { }
}
