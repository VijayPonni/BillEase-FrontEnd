import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateUser } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [CanActivateUser],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((module) => module.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureRoutingModule {}
