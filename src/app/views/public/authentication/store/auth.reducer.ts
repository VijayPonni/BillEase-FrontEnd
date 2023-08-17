import { createReducer, on } from '@ngrx/store';
import { setLoggedInUser, removeLoggedInUser } from './auth.actions';

const initialState = {
  name: '',
  email: '',
  token: '',
};

export const authenticationReducer = createReducer(
  initialState,
  on(setLoggedInUser, (initialState, { name, email, token }) => ({
    ...initialState,
    ...{
      name,
      email,
      token,
    },
  })),
  on(removeLoggedInUser, () => initialState)
);
