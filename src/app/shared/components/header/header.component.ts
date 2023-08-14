import { Component } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
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
        style({ opacity: 0, height: '*' }),
        animate('300ms ease-out', style({ opacity: 0, height: '0' })),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  showDropDown = false;
  showCurrentPassword = false;
  showNewPassword = false;
  showChangePasswordForm = false;

  toggleDropDown(event: MouseEvent): void {
    this.showDropDown = !this.showDropDown;
    this.showChangePasswordForm = false;
    event.stopPropagation();
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
  }
}
