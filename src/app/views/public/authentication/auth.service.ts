import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticationState, LoginResponse, UserCredentials } from './auth.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { setLoggedInUser } from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl: string = environment.apiUrl;
  constructor(
    private store: Store,
    private http: HttpClient
  ) {}

  public logIn(userCredentials: UserCredentials): Observable<HttpResponse<LoginResponse>> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/v1/login`, userCredentials, {
        observe: 'response',
      })
      .pipe(
        map((httpResponse: HttpResponse<LoginResponse>) => {
          const token = httpResponse.headers.get('Authorization');
          if (httpResponse.body && token) {
            const userDetails: AuthenticationState = {
              name: httpResponse.body.first_name,
              email: httpResponse.body.email,
              token: token,
            };
            this.store.dispatch(setLoggedInUser(userDetails));
          }
          return httpResponse;
        })
      );
  }
}
