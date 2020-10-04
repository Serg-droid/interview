import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.isAuthorized()) {
      req = req.clone({
        setHeaders: {
          Authenticated: this.auth.getToken()
        }
      })
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => this.authErrorHandler(error))
    )
  }

  private authErrorHandler(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    if(error.status === 401) {
      // здесь можно делать роутинг на страницу логина
    }

    return throwError(error)
  }
}
