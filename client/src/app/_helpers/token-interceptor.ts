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
export class TokenInterceptor implements HttpInterceptor {

  constructor(public inj: Injector) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const auth = this.inj.get(AuthenticationService);
    
    request = request.clone({
      url: appConfig.apiUrl + request.url,
      setHeaders: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    });
    return next.handle(request);
  }
  
}