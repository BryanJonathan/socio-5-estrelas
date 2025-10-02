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
import { Star, Mail, Lock, User } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { ROUTES } from "@/utils/consts";
import { isTokenValid } from "@/utils/tokenUtils";

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Nome deve ser maior que 2 caracteres")
      .max(50, "Nome muito grande"),
    email: z
      .string()
      .email("Endereço de email inválido")
      .min(1, "Email é obrigatório"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
      .regex(/[0-9]/, "A senha deve conter ao menos um número"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const registerUser = useAuthStore((state) => state.register);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

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

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      await registerUser(data.name, data.email, data.password);
      navigate(ROUTES.PROFILE);
    } catch (error) {
      console.error("Sign up error:", error);
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
              Seja Sócio Torcedor
            </h1>
            <p className="text-sm text-primary font-semibold">
              Cruzeiro Esporte Clube
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Junte-se à maior torcida de Minas
          </p>
        </div>

        {/* Sign Up Card */}
        <Card className="border-0 backdrop-blur-sm bg-card/80">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold">Cadastro</CardTitle>
            <CardDescription>
              Preencha seus dados para se tornar sócio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nome completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    className="pl-10"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                <Label htmlFor="password" className="text-sm font-medium">
                  Senha
                </Label>
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

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirmar senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    {...register("confirmPassword")}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
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
                {isLoading ? "Criando conta..." : "Criar conta"}
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

            {/* Sign In Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Já é sócio? </span>
              <Link
                to="/login"
                className="text-primary hover:underline font-semibold"
              >
                Faça login
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

export default SignUp;
