import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX_PATTERNS } from 'src/app/shared/constants/constants';
import { ForgotPasswordrequestParams } from '../auth.model';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../login/login.component.scss', './forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm!: FormGroup;
  ispasswordresendLinkSend: boolean = false;
  isLoading: boolean = false;
  subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastreService: ToastrService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(REGEX_PATTERNS.email)]],
    });
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const params: ForgotPasswordrequestParams = {
        email: this.forgotPasswordForm.value.email,
      };
      this.isLoading = true;

      const observer = this.authService.forgotPassword(params).subscribe({
        next: () => {
          this.ispasswordresendLinkSend = true;
          this.isLoading = false;
        },
        error: (error) => {
          this.toastreService.error(error);
          this.ispasswordresendLinkSend = false;
          this.isLoading = false;
        },
      });

      this.subscriptions.add(observer);
    }
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
