import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from '../_services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { appConfig } from '../app.config';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  constructor() {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({url: appConfig.apiUrl + request.url});
    return next.handle(request);
  }
}