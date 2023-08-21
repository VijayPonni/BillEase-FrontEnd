import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AuthenticationState,
  ForgotPasswordrequestParams,
  ForgotPwdResponse,
  LoginResponse,
  ResetPasswordRequestParams,
  UserCredentials,
} from './auth.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { setLoggedInUser } from './store/auth.actions';
import { SuccessMessage } from 'src/app/shared/shared.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl: string = environment.apiUrl;
  constructor(
    private store: Store,
    private http: HttpClient
  ) {}

  public logIn(userCredentials: UserCredentials): Observable<HttpResponse<LoginResponse>> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, userCredentials, {
        observe: 'response',
      })
      .pipe(
        map((httpResponse: HttpResponse<LoginResponse>) => {
          const token = httpResponse.headers.get('authorization');
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

  public logOut(): Observable<SuccessMessage> {
    return this.http.delete<any>(`${this.apiUrl}/logout`);
  }

  public forgotPassword(params: ForgotPasswordrequestParams): Observable<ForgotPwdResponse> {
    return this.http.post<ForgotPwdResponse>(`${this.apiUrl}/send_resend_password_link`, params);
  }

  public resetPassword(
    params: ResetPasswordRequestParams,
    token: string
  ): Observable<SuccessMessage> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<SuccessMessage>(`${this.apiUrl}/reset_password`, params, {
      headers: headers,
    });
  }
}
