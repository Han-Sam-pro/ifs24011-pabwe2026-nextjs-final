export interface LoginPayload {
  email?: string;
  username?: string;
  password?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface UserProfile {
  id?: string | number;
  name?: string;
  email?: string;
  username?: string;
  avatar?: string;
  [key: string]: any;
}

export interface AuthState {
  isAuthLogin: boolean;
  isAuthRegister: boolean;
  isAuthLogout: boolean;
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}