import { Component, OnDestroy } from '@angular/core';
import { Router, RouterEvent, Event, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnDestroy {
  isScannedBillPage: boolean = true;
  private subscriptions = new Subscription();

  constructor(private route: Router) {
    const observer = this.route.events
      .pipe(filter((e: Event | RouterEvent) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.isScannedBillRoute();
      });
    this.subscriptions.add(observer);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  isScannedBillRoute() {
    this.route.url.includes('/scanned_bill')
      ? (this.isScannedBillPage = true)
      : (this.isScannedBillPage = false);
  }
}
