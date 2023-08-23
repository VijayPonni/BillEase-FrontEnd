import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordMismatchValidator } from 'src/app/shared/validators/change-password.validator';
import { passwordValidator } from 'src/app/shared/validators/password.validator';
import { AuthService } from '../auth.service';
import { ResetPasswordRequestParams } from '../auth.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../login/login.component.scss', './reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  resetForm!: FormGroup;
  resetPasswordToken!: string;
  isLoading: boolean = false;
  subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private route: Router,
    private toastrService: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.resetPasswordToken = this.activatedRoute.snapshot.queryParams['reset_token'];
    this.resetForm = this.formBuilder.group(
      {
        new_password: [null, [Validators.required, Validators.minLength(6), passwordValidator]],
        confirm_password: [null, [Validators.required, Validators.minLength(6)]],
      },
      {
        validator: confirmPasswordMismatchValidator('new_password', 'confirm_password'),
      }
    );
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.resetForm.controls;
  }

  toggleShowNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onResetPassword() {
    this.isLoading = true;
    if (this.resetForm.valid) {
      const params: ResetPasswordRequestParams = {
        new_password: this.resetForm.value.new_password,
        confirm_new_password: this.resetForm.value.confirm_password,
      };

      const observer = this.authService.resetPassword(params, this.resetPasswordToken).subscribe({
        next: () => {
          this.isLoading = false;
          this.route.navigate(['/login']);
          this.toastrService.success('You have successfully reset your password');
        },
        error: (error) => {
          this.isLoading = false;
          this.toastrService.error(error.message);
        },
      });

      this.subscriptions.add(observer);
    }
  }
}
