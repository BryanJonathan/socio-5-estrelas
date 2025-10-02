import { jwtDecode } from "jwt-decode";

type JWTPayload = { exp: number };

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
