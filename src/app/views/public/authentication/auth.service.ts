import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AuthenticationState,
  ForgotPasswordrequestParams,
  ResetPasswordRequestParams,
  ChangePasswordParams,
  LoginResponse,
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
      .post<LoginResponse>(`${this.apiUrl}/v1/login`, userCredentials, {
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
    return this.http.delete<any>(`${this.apiUrl}/v1/logout`);
  }

  public forgotPassword(params: ForgotPasswordrequestParams): Observable<SuccessMessage> {
    return this.http.post<SuccessMessage>(`${this.apiUrl}/v1/send_resend_password_link`, params);
  }

  public resetPassword(
    params: ResetPasswordRequestParams,
    token: string
  ): Observable<SuccessMessage> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<SuccessMessage>(`${this.apiUrl}/v1/reset_password`, params, {
      headers: headers,
    });
  }

  public changePassword(changePasswordParams: ChangePasswordParams): Observable<SuccessMessage> {
    return this.http.post<SuccessMessage>(
      `${this.apiUrl}/v1/change_password`,
      changePasswordParams
    );
  }
}
