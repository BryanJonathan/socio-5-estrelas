import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Trophy,
  Calendar,
  MapPin,
  Mail,
  Phone,
  CreditCard,
  Gift,
  TrendingUp,
  Users,
} from "lucide-react";

const Profile = () => {
  const memberStats = [
    { label: "Jogos Assistidos", value: "124", icon: Trophy },
    { label: "Anos de Sócio", value: "8", icon: Calendar },
    { label: "Pontos Acumulados", value: "2.450", icon: Star },
    { label: "Amigos Indicados", value: "12", icon: Users },
  ];

  const benefits = [
    "Desconto de 50% em ingressos",
    "Acesso à área VIP do estádio",
    "Prioridade na compra de ingressos",
    "Kit exclusivo de boas-vindas",
    "Desconto em produtos oficiais",
    "Acesso a eventos exclusivos",
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Card */}
      <Card className="border-border shadow-card overflow-hidden">
        <div className="h-32 bg-gradient-hero" />
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-16 md:-mt-12">
              <Avatar className="h-32 w-32 border-4 border-card shadow-xl">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                  JS
                </AvatarFallback>
              </Avatar>

              <div className="text-center md:text-left space-y-2 mb-2">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h1 className="text-3xl font-bold text-foreground">
                    João Silva
                  </h1>
                  <Badge className="bg-gradient-hero text-primary-foreground border-0 shadow-sm">
                    <Star className="h-3 w-3 mr-1 fill-current" />5 Estrelas
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  Sócio desde Janeiro de 2016
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Editar Perfil
              </Button>
              <Button size="sm" className="bg-gradient-hero hover:opacity-90">
                Renovar Plano
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {memberStats.map((stat, index) => (
          <Card
            key={index}
            className="border-border shadow-card hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <Card className="lg:col-span-2 border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-xl">Informações de Contato</CardTitle>
            <CardDescription>Seus dados cadastrados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
              <Mail className="h-5 w-5 text-accent-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">joao.silva@email.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
              <Phone className="h-5 w-5 text-accent-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p className="font-medium">(31) 98765-4321</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
              <MapPin className="h-5 w-5 text-accent-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Endereço</p>
                <p className="font-medium">Belo Horizonte, MG</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
              <CreditCard className="h-5 w-5 text-accent-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Número de Sócio</p>
                <p className="font-medium text-primary font-mono">
                  CRU-5★-002459
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              Benefícios
            </CardTitle>
            <CardDescription>Vantagens do plano 5 Estrelas</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Star className="h-4 w-4 text-primary fill-current flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Activity Card */}
      <Card className="border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Atividade Recente
          </CardTitle>
          <CardDescription>Suas últimas interações como sócio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "Ingresso adquirido",
                detail: "Cruzeiro x Atlético - Mineirão",
                date: "Há 2 dias",
              },
              {
                action: "Produto comprado",
                detail: "Camisa Oficial 2024",
                date: "Há 1 semana",
              },
              {
                action: "Evento participado",
                detail: "Meet & Greet com jogadores",
                date: "Há 2 semanas",
              },
              {
                action: "Pontos resgatados",
                detail: "Desconto em produtos oficiais",
                date: "Há 3 semanas",
              },
            ].map((activity, index) => (
              <div key={index}>
                <div className="flex items-start justify-between py-3">
                  <div>
                    <p className="font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.detail}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.date}
                  </span>
                </div>
                {index < 3 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
