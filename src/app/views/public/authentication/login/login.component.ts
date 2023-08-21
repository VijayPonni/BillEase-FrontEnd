import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX_PATTERNS } from 'src/app/shared/constants/constants';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../auth.model';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  showPassword = false;
  loginForm!: FormGroup;
  isLoading: boolean = false;
  private subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(REGEX_PATTERNS.email)]],
      password: [null, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  logIn(): void {
    this.isLoading = true;
    const observer = this.authService.logIn(this.loginForm.value).subscribe({
      next: (loginResponse: HttpResponse<LoginResponse>) => {
        this.router.navigateByUrl('/dashboard');
        this.toastrService.success('Logged in successfully');
        this.isLoading = false;
      },
      error: (error) => {
        this.toastrService.error(error.errors);
        this.isLoading = false;
      },
    });
    this.subscriptions.add(observer);
  }
}
