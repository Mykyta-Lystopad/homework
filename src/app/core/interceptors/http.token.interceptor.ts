import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {JwtService, UserService} from '../services';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private jwtService: JwtService,
    private userServise: UserService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.jwtService.token;

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    req = req.clone({setHeaders: headersConfig});
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('[interseptor Error]:', error);
          if (400 <= error.status && error.status <= 526) {
            this.userServise.logout();
          }
          return throwError(error);
        })
      );


    /* const headersConfig = {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     };

     const token = this.jwtService.token;

     if (token) {
       headersConfig['Authorization'] = `Bearer ${token}`;
     }

     const request = req.clone({ setHeaders: headersConfig });
     return next.handle(request);
     */

  }
}
