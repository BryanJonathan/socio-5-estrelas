export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  NOTFOUND: "*",
  PANEL: "/painel",
  PROFILE: "/perfil",
  EVENTS: "/eventos",
  BENEFITS: "/beneficios",
};

const API_BASE_URL = "http://localhost:3000/api";

export const API_REGISTER = `${API_BASE_URL}/register`;
export const API_LOGIN = `${API_BASE_URL}/login`;
