import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { confirmPasswordMismatchValidator } from 'src/app/shared/validators/change-password.validator';
import { passwordValidator } from 'src/app/shared/validators/password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../login/login.component.scss', './reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  resetForm!: FormGroup;
  resetPasswordToken!: string;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

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
}
