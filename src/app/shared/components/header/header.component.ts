import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../validators/password.validator';
import { changePasswordMismatchValidator } from '../../validators/change-password.validator';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, height: '0' }),
        animate('300ms ease-in', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate('300ms ease-out', style({ opacity: 0, height: '0' })),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  showDropDown = false;
  showCurrentPassword = false;
  showNewPassword = false;
  showChangePasswordForm = false;
  changePasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        currentPassword: [null, Validators.required],
        newPassword: [null, [Validators.required, Validators.minLength(6), passwordValidator]],
      },
      {
        validators: [changePasswordMismatchValidator('currentPassword', 'newPassword')],
      }
    );
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.changePasswordForm.controls;
  }

  toggleDropDown(event: MouseEvent): void {
    event.stopPropagation();
    this.showDropDown = !this.showDropDown;
    this.showChangePasswordForm = false;
    this.changePasswordForm.reset();
  }

  closeDropDown(): void {
    if (this.showDropDown) {
      this.showDropDown = false;
      this.showChangePasswordForm = false;
    }
  }

  toggleCurrentPassword(): void {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleChangePasswordForm(): void {
    this.showChangePasswordForm = !this.showChangePasswordForm;
    this.changePasswordForm.reset();
  }
}
