import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { isTokenValid } from "@/utils/tokenUtils";
import { ROUTES } from "@/utils/consts";

export default function PrivateRoute() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  if (!token) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const isValidToken = isTokenValid(token);

  if (!isValidToken) {
    logout();
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
}
