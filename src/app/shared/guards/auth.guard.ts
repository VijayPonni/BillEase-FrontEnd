import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { selectToken } from 'src/app/views/public/authentication/store/auth.selector';

@Injectable({ providedIn: 'root' })
class AuthGuard {
  token = '';

  constructor(
    private readonly store: Store<AppState>,
    private router: Router
  ) {
    this.store.select(selectToken).subscribe((token: string) => {
      this.token = 'token';
    });
  }

  CanActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.token) {
      return true;
    } else {
      return this.router.navigateByUrl('/login');
    }
  }
}

export const CanActivateUser: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  return inject(AuthGuard).CanActivate();
};
