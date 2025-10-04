import { Panel } from "react-resizable-panels";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  NOTFOUND: "*",
  PANEL: "/painel",
  PROFILE: "/perfil",
  EVENTS: "/eventos",
  BENEFITS: "/beneficios",
  FORGOT_PASSWORD: "/esqueci-senha",
};

export const ROUTES_ADMIN = {
  LOGIN: "/admin/login",
  PANEL: "/admin/painel",
};

const API_BASE_URL = "http://localhost:3000/api";

export const API_REGISTER = `${API_BASE_URL}/register`;
export const API_LOGIN = `${API_BASE_URL}/login`;
export const SEND_EMAIL_RECOVER_PASSWORD = `${API_BASE_URL}/recover-password`;
export const RECOVER_PASSWORD = `${API_BASE_URL}/reset-password`;
