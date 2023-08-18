import { createAction, props } from '@ngrx/store';
import { AuthenticationState } from '../auth.model';

export const setLoggedInUser = createAction(
  '[User login] Set logged in user',
  props<AuthenticationState>()
);

export const removeLoggedInUser = createAction('[User login] Remove logged in user');
