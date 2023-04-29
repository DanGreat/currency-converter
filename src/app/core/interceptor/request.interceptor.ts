import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private API_KEY: string = environment.apikey;
  
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers.set('apikey', `${this.API_KEY}`),
    });

    return next
      .handle(request)
      .pipe(catchError((error) => this.handleErrors(error)));
  }

  private handleErrors(error: HttpErrorResponse) {
    const statusCode = error.status;
    let errorMessage: any;

    if (error.error instanceof ErrorEvent) errorMessage = error?.error?.message;
    else errorMessage = error?.error?.message;

    // Handle different status codes and error message to the user
    switch (statusCode) {
      case 429:
        console.log(errorMessage || 'You are unauthorized, please relogin');
        return throwError(() => error);

      default:
        console.log(errorMessage)
        return throwError(() => error);
    }
  }
}
