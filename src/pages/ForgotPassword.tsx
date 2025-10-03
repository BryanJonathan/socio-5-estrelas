import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowLeft, Mail, Shield, Lock, CheckCircle } from "lucide-react";
import { ROUTES } from "@/utils/consts";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/authStore";

const emailSchema = z.object({
  email: z
    .string()
    .email("Endereço de email inválido")
    .min(1, "Email é obrigatório"),
});

const resetSchema = z
  .object({
    code: z.string().length(6, "O código deve ter 6 dígitos"),
    newPassword: z
      .string()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .max(100),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

type EmailFormData = z.infer<typeof emailSchema>;
type ResetFormData = z.infer<typeof resetSchema>;

const ForgotPassword = () => {
  const sendEmail = useAuthStore((state) => state.sendEmailRecoverPassword);
  const resetPassword = useAuthStore((state) => state.passwordRecover);

  const [step, setStep] = useState<"email" | "verify" | "success">("email");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onEmailSubmit = async (data: EmailFormData) => {
    setIsLoading(true);

    const res = await sendEmail(data.email);

    if (!res.success) {
      toast({
        title: "Erro ao enviar email.",
        description: "Houve um erro ao fazer a recuperação da sua senha",
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setUserEmail(data.email);
    setStep("verify");
    toast({
      title: "Código enviado!",
      description: "Verifique seu email e insira o código de 6 dígitos.",
    });
  };

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    setValue,
    formState: { errors: resetErrors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onResetSubmit = async (data: ResetFormData) => {
    setIsLoading(true);

    const res = await resetPassword(data.code, userEmail, data.newPassword);

    if (!res.success) {
      toast({
        title: "Erro ao redefinir senha.",
        description: res.message.includes("Invalid code")
          ? "Código inválido"
          : res.message,
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setStep("success");
    toast({
      title: "Senha redefinida!",
      description: res.message,
    });

    setTimeout(() => {
      navigate(ROUTES.LOGIN);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md">
        <Link
          to={ROUTES.LOGIN}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>

        <Card className="border-primary/10 shadow-elegant">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              {step === "success" ? (
                <CheckCircle className="h-6 w-6 text-primary" />
              ) : step === "verify" ? (
                <Lock className="h-6 w-6 text-primary" />
              ) : (
                <Shield className="h-6 w-6 text-primary" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {step === "success"
                ? "Senha redefinida!"
                : step === "verify"
                ? "Redefinir senha"
                : "Esqueceu sua senha?"}
            </CardTitle>
            <CardDescription>
              {step === "success"
                ? "Sua senha foi alterada com sucesso. Redirecionando..."
                : step === "verify"
                ? `Código enviado para ${userEmail}`
                : "Sem problemas! Digite seu email e enviaremos um código de verificação"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {step === "email" && (
              <form
                onSubmit={handleEmailSubmit(onEmailSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-4 h-5 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-9"
                      {...registerEmail("email")}
                    />
                  </div>
                  {emailErrors.email && (
                    <p className="text-sm text-destructive">
                      {emailErrors.email.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Enviar código"}
                </Button>
              </form>
            )}

            {step === "verify" && (
              <form
                onSubmit={handleResetSubmit(onResetSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="code">Código de verificação</Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      onChange={(value) => setValue("code", value)}
                    >
                      <InputOTPGroup>
                        {[...Array(6)].map((_, i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {resetErrors.code && (
                    <p className="text-sm text-destructive text-center">
                      {resetErrors.code.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Digite sua nova senha"
                      className="pl-9"
                      {...registerReset("newPassword")}
                    />
                  </div>
                  {resetErrors.newPassword && (
                    <p className="text-sm text-destructive">
                      {resetErrors.newPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirme sua nova senha"
                      className="pl-9"
                      {...registerReset("confirmPassword")}
                    />
                  </div>
                  {resetErrors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {resetErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Redefinindo..." : "Redefinir senha"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep("email")}
                >
                  Voltar
                </Button>
              </form>
            )}

            {/* Step SUCCESS */}
            {step === "success" && (
              <div className="space-y-4">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center space-y-2">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="text-sm text-foreground font-medium">
                    Senha alterada com sucesso!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Você será redirecionado em instantes...
                  </p>
                </div>
              </div>
            )}

            {step !== "success" && (
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  Lembrou sua senha?{" "}
                </span>
                <Link
                  to={ROUTES.HOME}
                  className="text-primary hover:underline font-medium"
                >
                  Fazer login
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Sócio 5 Estrelas • Cruzeiro Esporte Clube</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
