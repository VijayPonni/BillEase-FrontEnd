import { ActionReducerMap } from '@ngrx/store';
import { AuthenticationState } from './views/public/authentication/auth.model';
import { authenticationReducer } from './views/public/authentication/store/auth.reducer';

export interface AppState {
  authenticationState: AuthenticationState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authenticationState: authenticationReducer,
};
