import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from './app.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { removeLoggedInUser } from './views/public/authentication/store/auth.actions';

const STORE_KEYS_TO_PERSIST = ['authenticationState'];

function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return localStorageSync({ keys: STORE_KEYS_TO_PERSIST, rehydrate: true })(reducer);
}

function logOut(reducer: ActionReducer<AppState>): ActionReducer<any> {
  return (state: AppState, action: Action) => {
    if (action.type === removeLoggedInUser.type) {
      state = {} as AppState;
    }
    return reducer(state, action);
  };
}

export const metaReducers: Array<MetaReducer<AppState, Action>> = [localStorageSyncReducer, logOut];
