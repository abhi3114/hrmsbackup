import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
  } from "@angular/common/http";
  import { Observable } from "rxjs/Observable";
  import { Router } from '@angular/router';

  @Injectable()
  export class MyInterceptor implements HttpInterceptor {
    constructor(private router:Router) { }
    //function which will be called for all http calls
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
      ): Observable<HttpEvent<any>> {
      //how to update the request Parameters
      const updatedRequest = request.clone({
        });
      return next.handle(request).pipe(
        tap(
          event => {
            //logging the http response to browser's console in case of a success
            if (event instanceof HttpResponse) {
            }
            },
            error => {
              //logging the http response to browser's console in case of a failuer
              console.log(error.status);
              if(error.status === 401)
              {
                this.router.navigateByUrl('/login');
              }

            }
            )
        );
    }
  }
