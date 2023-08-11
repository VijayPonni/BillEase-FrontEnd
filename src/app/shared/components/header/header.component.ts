import { Component } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showDropDown = false;
  showCurrentPassword = false;
  showNewPassword = false;

  toggleDropDown(event: MouseEvent): void {
    this.showDropDown = !this.showDropDown;
    event.stopPropagation();
  }

  closeDropDown(): void {
    if (this.showDropDown) {
      this.showDropDown = false;
    }
  }

  toggleCurrentPassword(): void {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }
}
