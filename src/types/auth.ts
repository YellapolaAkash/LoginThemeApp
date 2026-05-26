export interface LoginFormValues {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    email: string;
  };
}
