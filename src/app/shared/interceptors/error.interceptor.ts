import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { removeLoggedInUser } from 'src/app/views/public/authentication/store/auth.actions';
import { ErrorReponse } from '../shared.model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private store: Store,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        const errorResponse: ErrorReponse = {
          message: httpErrorResponse.error.detail,
          status: httpErrorResponse.status,
        };
        const errorMessage = errorResponse.message;

        if (httpErrorResponse.status <= 0) {
          errorResponse.message =
            'Sorry, no Internet connectivity, Please reconnect and try again!';
        } else if (httpErrorResponse.status == 400) {
          errorResponse.message = 'Bad Request';
        } else if (httpErrorResponse.status == 401) {
          this.store.dispatch(removeLoggedInUser());
          this.router.navigateByUrl('/login');
          errorResponse.message =
            errorMessage ||
            'Sorry for the inconvenience, but you are not authorized to look into this page';
        } else if (httpErrorResponse.status == 403) {
          errorResponse.message = errorMessage || 'forbidden';
        } else if (httpErrorResponse.status == 404) {
          errorResponse.message = errorMessage || 'Not found';
        } else if (httpErrorResponse.status == 422) {
          errorResponse.message = httpErrorResponse.statusText || 'Validation Error';
        } else if (httpErrorResponse.status == 500) {
          errorResponse.message = errorMessage || 'Internal Sever Error';
        } else {
          errorResponse.message = errorMessage || 'Something went wrong. Please contact Admin';
        }
        return throwError(() => errorResponse);
      })
    );
  }
}
