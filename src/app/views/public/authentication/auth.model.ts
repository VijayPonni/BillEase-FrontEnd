export interface AuthenticationState {
  name: string;
  email: string;
  token: string;
}

export interface LoginResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface ChangePasswordParams {
  current_password: string;
  new_password: string;
}
