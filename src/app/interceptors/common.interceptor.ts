import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (token) request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
    return next.handle(request);
}
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true}];