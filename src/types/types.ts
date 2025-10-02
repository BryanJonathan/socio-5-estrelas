export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthState = {
  user: User | null;
  token: string | null;

  setUser: (user: User, token: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
};

export type FormDataRegister = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}
