import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P404Component } from './views/public/error/p404/p404.component';
import { DefaultLayoutComponent } from './shared/containers/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./views/public/authentication/authentication.module').then(
        (module) => module.AuthenticationModule
      ),
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import('./views/secure/secure.module').then((module) => module.SecureModule),
  },
  {
    path: '**',
    component: P404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
