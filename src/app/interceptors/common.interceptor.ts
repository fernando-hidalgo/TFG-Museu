import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, concatMap, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.authService.isLogged()) {
      return next.handle(request);
    }

    const token = this.authService.getToken();
    const intReq = this.addToken(request, token);

    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        return this.authService.refresh({token}).pipe(
          tap((data: any) => this.authService.setToken(data.token)),
          concatMap((data: any) => next.handle(this.addToken(request, data.token)))
        );
      } else {
        this.authService.deleteToken();
        return throwError(err);
      }
    }));
  }

  private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
  }
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true}];