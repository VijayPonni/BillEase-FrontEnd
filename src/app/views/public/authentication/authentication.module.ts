import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication.routing';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [CommonModule, AuthenticationRoutingModule, ReactiveFormsModule],
})
export class AuthenticationModule {}
