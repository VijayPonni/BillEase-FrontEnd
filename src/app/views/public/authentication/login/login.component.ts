import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX_PATTERNS } from 'src/app/shared/constants/constants';
import { AuthService } from '../auth.service';
import { ErrorReponse } from 'src/app/shared/shared.model';
import { LoginResponse } from '../auth.model';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword = false;
  loginForm!: FormGroup;
  private subscriptions!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(REGEX_PATTERNS.email)]],
      password: [null, Validators.required],
    });
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  logIn(): void {
    const observer = this.authService.logIn(this.loginForm.value).subscribe({});
    this.subscriptions.add(observer);
  }
}
