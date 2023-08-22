import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  isScannedBillPage: boolean = true;

  constructor(private route: Router) {
    this.route.events
      .pipe(filter((e: Event | RouterEvent) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.isScannedBillRoute();
      });
  }

  isScannedBillRoute() {
    this.route.url.includes('/scanned_bill')
      ? (this.isScannedBillPage = true)
      : (this.isScannedBillPage = false);
  }
}
