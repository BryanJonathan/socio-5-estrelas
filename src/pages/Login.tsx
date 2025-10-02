import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, Mail, Lock } from "lucide-react";
import { ROUTES } from "@/utils/consts";
import { useAuthStore } from "@/stores/authStore";
import { isTokenValid } from "@/utils/tokenUtils";

const loginSchema = z.object({
  email: z
    .string()
    .email("Endereço de email inválido")
    .min(1, "Email é obrigatório"),
  password: z
    .string()
    .min(6, "Senha deve ser no mínimo 6 caracteres")
    .max(100)
    .min(1, "Senha é obrigatória"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  if (token) {
    const isValidToken = isTokenValid(token);
    console.log(isValidToken);
    if (isValidToken) {
      return <Navigate to={ROUTES.PROFILE} replace />;
    } else {
      logout();
    }
  }

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-in fade-in duration-500">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center space-y-3">
          <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
            <Star className="h-12 w-12 text-primary-foreground fill-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-primary font-semibold">
              Sócio Torcedor Cruzeiro
            </p>
          </div>
          <p className="text-sm text-muted-foreground">Entre na sua conta</p>
        </div>

        {/* Login Card */}
        <Card className="border-0 backdrop-blur-sm bg-card/80">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
            <CardDescription>
              Digite seu email e senha para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Esqueceu?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Ainda não é sócio? </span>
              <Link
                to={ROUTES.REGISTER}
                className="text-primary hover:underline font-semibold"
              >
                Cadastre-se agora
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          Ao continuar, você concorda com nossos Termos de Serviço e Política de
          Privacidade
        </p>
      </div>
    </div>
  );
};

export default Login;
