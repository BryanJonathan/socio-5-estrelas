import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { ROUTES, ROUTES_ADMIN } from "./utils/consts";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import PrivateLayout from "./components/PrivateLayout";
import Panel from "./pages/Panel";
import Events from "./pages/Events";
import Benefits from "./pages/Benefits";
import AdminPanel from "./pages/admin/Panel";
import PrivateLayoutAdmin from "./components/PrivateLayoutAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* PUBLICAS */}
          <Route path={ROUTES.HOME} element={<Index />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<SignUp />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES.NOTFOUND} element={<NotFound />} />

          {/* PRIVADAS USER */}
          <Route element={<PrivateRoute />}>
            <Route element={<PrivateLayout />}>
              <Route path={ROUTES.PANEL} element={<Panel />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} />
              <Route path={ROUTES.EVENTS} element={<Events />} />
              <Route path={ROUTES.BENEFITS} element={<Benefits />} />
            </Route>
          </Route>

          {/* PRIVADAS ADMIN */}
          <Route element={<PrivateRouteAdmin />}>
            <Route element={<PrivateLayoutAdmin />}>
              <Route path={ROUTES_ADMIN.PANEL} element={<AdminPanel />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
