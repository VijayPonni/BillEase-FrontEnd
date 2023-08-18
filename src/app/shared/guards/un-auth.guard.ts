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
class UnAuthGuard {
  token = '';

  constructor(
    private readonly store: Store<AppState>,
    private router: Router
  ) {
    this.store.select(selectToken).subscribe((token: string) => {
      this.token = token;
    });
  }

  CanDeActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.token) {
      this.router.navigateByUrl('/dashboard');
      return false;
    } else {
      return true;
    }
  }
}

export const CanDeActivateUser: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  return inject(UnAuthGuard).CanDeActivate();
};
