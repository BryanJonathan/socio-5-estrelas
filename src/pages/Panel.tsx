import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Calendar, Gift, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/utils/consts";

const Panel = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 md:p-12 text-primary-foreground shadow-xl">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-8 w-8 fill-current" />
            <Star className="h-8 w-8 fill-current" />
            <Star className="h-8 w-8 fill-current" />
            <Star className="h-8 w-8 fill-current" />
            <Star className="h-8 w-8 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bem-vindo, Sócio 5 Estrelas!
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-6 max-w-2xl">
            Você faz parte da elite do Cruzeiro Esporte Clube. Aproveite todos
            os benefícios exclusivos do plano mais premium.
          </p>
          <Button asChild size="lg" variant="secondary" className="shadow-lg">
            <Link to={ROUTES.PROFILE}>
              Ver Meu Perfil
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border shadow-card hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Jogo</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Domingo, 18h</div>
            <p className="text-xs text-muted-foreground mt-1">
              Cruzeiro x Atlético - Mineirão
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-card hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pontos Disponíveis
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.450</div>
            <p className="text-xs text-muted-foreground mt-1">
              +150 pontos este mês
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-card hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Benefícios Ativos
            </CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Vantagens exclusivas ativas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle>Destaques da Semana</CardTitle>
            <CardDescription>Confira as novidades do clube</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
              <div className="h-16 w-16 rounded-lg bg-gradient-hero flex items-center justify-center flex-shrink-0">
                <Trophy className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Cruzeiro vence mais uma</h3>
                <p className="text-sm text-muted-foreground">
                  Vitória por 3x1 no último domingo
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
              <div className="h-16 w-16 rounded-lg bg-gradient-hero flex items-center justify-center flex-shrink-0">
                <Gift className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Nova coleção disponível</h3>
                <p className="text-sm text-muted-foreground">
                  50% de desconto para sócios 5★
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle>Eventos Exclusivos</CardTitle>
            <CardDescription>Atividades especiais para você</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">Meet & Greet</h3>
                <Badge className="bg-primary text-primary-foreground">
                  Em breve
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Encontro com jogadores do elenco principal
              </p>
              <p className="text-xs text-muted-foreground">
                15 de Outubro, 2024
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">Tour pelo CT</h3>
                <Badge className="bg-primary text-primary-foreground">
                  Vagas limitadas
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Conheça os bastidores do clube
              </p>
              <p className="text-xs text-muted-foreground">
                22 de Outubro, 2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Panel;
