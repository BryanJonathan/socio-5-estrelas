import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import { ROUTES } from "@/utils/consts";
import { Shield, Users, Activity, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };
  const stats = [
    {
      title: "Usuários Ativos",
      value: "1,234",
      icon: Users,
      description: "Total de membros 5 estrelas",
    },
    {
      title: "Eventos Criados",
      value: "48",
      icon: Activity,
      description: "Eventos neste mês",
    },
    {
      title: "Benefícios Ativos",
      value: "12",
      icon: Shield,
      description: "Benefícios disponíveis",
    },
    {
      title: "Configurações",
      value: "8",
      icon: Settings,
      description: "Módulos configurados",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <Button onClick={handleLogout}>LOGOUT</Button>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground">Cruzeiro 5 Estrelas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>
              Painel de controle e gerenciamento do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Bem-vindo ao painel administrativo. Aqui você pode gerenciar
              usuários, eventos, benefícios e configurações do sistema.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
