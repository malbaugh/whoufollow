import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../CurrentUser/current-user.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private currentUserService: CurrentUserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (this.currentUserService.CurrentStrId) {
      request = request.clone({
        setHeaders: { 
          'Content-Type': 'application/json',
          'Authorization': `${this.currentUserService.CurrentStrId}`
        }
      });
    } else {
      request = request.clone({
        setHeaders: { 
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(request);
  }
}