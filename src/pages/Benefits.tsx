import {
  Crown,
  Gift,
  Ticket,
  Star,
  Trophy,
  Users,
  Shirt,
  CreditCard,
  Store,
  PartyPopper,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: "exclusivo" | "desconto" | "prioritario" | "gratis";
  featured: boolean;
}

const benefits: Benefit[] = [
  {
    id: "1",
    title: "Ingressos Prioritários",
    description:
      "Acesso prioritário à compra de ingressos para todos os jogos do Cruzeiro, incluindo finais e clássicos.",
    icon: Ticket,
    category: "prioritario",
    featured: true,
  },
  {
    id: "2",
    title: "Desconto de 30% na Loja Oficial",
    description:
      "Desconto exclusivo de 30% em todos os produtos da loja oficial do Cruzeiro, incluindo camisas e produtos licenciados.",
    icon: Store,
    category: "desconto",
    featured: true,
  },
  {
    id: "3",
    title: "Camisa Exclusiva de Sócio",
    description:
      "Receba anualmente uma camisa exclusiva do Cruzeiro, disponível apenas para Sócios 5 Estrelas.",
    icon: Shirt,
    category: "gratis",
    featured: true,
  },
  {
    id: "4",
    title: "Acesso ao Lounge VIP",
    description:
      "Entrada exclusiva ao Lounge VIP do estádio com comidas e bebidas de cortesia em dias de jogo.",
    icon: Crown,
    category: "exclusivo",
    featured: true,
  },
  {
    id: "5",
    title: "Encontro com Jogadores",
    description:
      "Participação em eventos exclusivos de encontro com jogadores e comissão técnica do Cruzeiro.",
    icon: Users,
    category: "exclusivo",
    featured: false,
  },
  {
    id: "6",
    title: "Tour pela Toca da Raposa",
    description:
      "Tour guiado gratuito pelo centro de treinamento do Cruzeiro, com visita aos vestiários e campo.",
    icon: Trophy,
    category: "gratis",
    featured: false,
  },
  {
    id: "7",
    title: "Desconto em Estacionamento",
    description:
      "50% de desconto no estacionamento oficial do estádio em todos os jogos.",
    icon: CreditCard,
    category: "desconto",
    featured: false,
  },
  {
    id: "8",
    title: "Brindes Exclusivos",
    description:
      "Receba brindes exclusivos durante campanhas especiais e datas comemorativas do clube.",
    icon: Gift,
    category: "gratis",
    featured: false,
  },
  {
    id: "9",
    title: "Programa de Pontos",
    description:
      "Acumule pontos a cada jogo e troque por produtos, ingressos e experiências exclusivas.",
    icon: Star,
    category: "exclusivo",
    featured: false,
  },
  {
    id: "10",
    title: "Acesso a Eventos Especiais",
    description:
      "Convites para eventos especiais do clube, incluindo apresentações de reforços e comemorações.",
    icon: PartyPopper,
    category: "exclusivo",
    featured: false,
  },
];

const Benefits = () => {
  const featuredBenefits = benefits.filter((b) => b.featured);
  const otherBenefits = benefits.filter((b) => !b.featured);

  const getCategoryBadge = (category: string) => {
    const badges = {
      exclusivo: {
        label: "Exclusivo",
        className: "bg-primary text-primary-foreground",
      },
      desconto: {
        label: "Desconto",
        className: "bg-secondary text-secondary-foreground",
      },
      prioritario: {
        label: "Prioritário",
        className: "bg-accent text-accent-foreground",
      },
      gratis: { label: "Grátis", className: "bg-primary/20 text-primary" },
    };
    return badges[category as keyof typeof badges];
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Crown className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              Benefícios Exclusivos
            </h1>
          </div>
          <p className="text-muted-foreground">
            Aproveite todas as vantagens de ser um Sócio 5 Estrelas do Cruzeiro
            Esporte Clube
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-3 rounded-lg bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">10+</p>
              <p className="text-sm text-muted-foreground">Benefícios Ativos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-3 rounded-lg bg-primary/10">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">30%</p>
              <p className="text-sm text-muted-foreground">Desconto Médio</p>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-3 rounded-lg bg-primary/10">
                <Crown className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">4</p>
              <p className="text-sm text-muted-foreground">Benefícios VIP</p>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-3 rounded-lg bg-primary/10">
                <Ticket className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">100%</p>
              <p className="text-sm text-muted-foreground">Prioridade</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Benefits */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-primary" />
          Benefícios em Destaque
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredBenefits.map((benefit) => {
            const Icon = benefit.icon;
            const categoryBadge = getCategoryBadge(benefit.category);

            return (
              <Card key={benefit.id} className="premium-card hover-scale">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge className={categoryBadge.className}>
                      {categoryBadge.label}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Saiba Mais
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Other Benefits */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Gift className="h-6 w-6 text-primary" />
          Todos os Benefícios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {otherBenefits.map((benefit) => {
            const Icon = benefit.icon;
            const categoryBadge = getCategoryBadge(benefit.category);

            return (
              <Card key={benefit.id} className="premium-card hover-scale">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge className={categoryBadge.className}>
                      {categoryBadge.label}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Card */}
      <Card className="premium-card bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <Crown className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Aproveite Todos os Benefícios
          </h3>
          <p className="text-muted-foreground mb-6">
            Como Sócio 5 Estrelas, você tem acesso ilimitado a todos esses
            benefícios exclusivos
          </p>
          <Button size="lg" className="gap-2">
            <Ticket className="h-5 w-5" />
            Acessar Benefícios
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Benefits;
