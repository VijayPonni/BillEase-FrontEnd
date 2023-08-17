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
          errors: httpErrorResponse.error.errors,
        };
        if (httpErrorResponse.status === 401) {
          this.store.dispatch(removeLoggedInUser());
          this.router.navigateByUrl('/login');
        }
        return throwError(() => errorResponse);
      })
    );
  }
}
