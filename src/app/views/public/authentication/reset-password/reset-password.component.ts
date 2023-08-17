import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../login/login.component.scss', './reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  showPassword: boolean = false;
  resetForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      new_password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]],
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
