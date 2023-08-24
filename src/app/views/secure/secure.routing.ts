import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateUser } from 'src/app/shared/guards/auth.guard';
import { ScannedBillComponent } from './dashboard/scanned-bill/scanned-bill.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [CanActivateUser],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((module) => module.DashboardModule),
  },
  {
    path: 'scanned_bill',
    component: ScannedBillComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureRoutingModule {}
