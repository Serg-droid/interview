import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../../entities/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string

  error$: Subject<any> = new Subject<any>()
  token$: Subject<any> = new Subject<any>()

  constructor(private http: HttpClient) {}

  login(user: User): Observable<{token: string, expiresIn: string}> {
    return this.http.post<{token: string, expiresIn: string}>('url', user)
      .pipe(
        tap(({token, expiresIn}) => {
          const expDate = new Date(new Date().getTime() + +expiresIn * 1000)
          localStorage.setItem('auth-token-exp', String(expDate))
          localStorage.setItem('auth-token', token)
          this.setToken(token)
        }),
        catchError(this.handleError.bind(this))
      )
  }

  getToken() {
    const expDate = new Date(+localStorage.getItem('auth-token-exp'))
    console.log(expDate)
    if(new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('auth-token')
  }

  setToken(token) {
    this.token = token
    this.token$.next()
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }

  isAuthorized() {
    return !!this.token
  }

  handleError(error: HttpErrorResponse) {
    const {message} = error
    this.error$.next(message)
    return throwError(error)
  }
}
