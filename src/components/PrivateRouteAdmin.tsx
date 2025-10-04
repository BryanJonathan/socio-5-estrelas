import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { isTokenValid } from "@/utils/tokenUtils";
import { ROUTES, ROUTES_ADMIN } from "@/utils/consts";

export default function PrivateRouteAdmin() {
  const { user } = useAuthStore();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setRedirectPath(ROUTES_ADMIN.LOGIN);
      return;
    }

    if (!isTokenValid(token)) {
      logout();
      setRedirectPath(ROUTES_ADMIN.LOGIN);
      return;
    }

    if (user?.role !== "admin") {
      logout();
      setRedirectPath(ROUTES.LOGIN);
      return;
    }
  }, [token, user?.role, logout]);

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
