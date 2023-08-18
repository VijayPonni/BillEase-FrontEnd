import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { selectToken } from 'src/app/views/public/authentication/store/auth.selector';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token = '';

  constructor(private store: Store<AppState>) {
    this.store.select(selectToken).subscribe((token: string) => {
      this.token = token;
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.token) {
      request = request.clone({
        setHeaders: { Authorization: this.token },
      });
    }
    return next.handle(request);
  }
}
