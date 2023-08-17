import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthenticationState } from '../auth.model';

const selectAuthenticationState = (state: AppState) => state.authenticationState;

export const selectToken = createSelector(
  selectAuthenticationState,
  (state: AuthenticationState) => state.token
);

export const selectUserDetails = createSelector(
  selectAuthenticationState,
  (state: AuthenticationState) => ({ email: state.email, name: state.name })
);
