import { useState } from "react";
import { Calendar, MapPin, Clock, Users, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Event {
  id: string;
  title: string;
  opponent: string;
  date: string;
  time: string;
  location: string;
  category: "masculino" | "feminino" | "base";
  competition: string;
  ticketsAvailable: number;
  status: "upcoming" | "confirmed" | "sold-out";
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Cruzeiro vs Atlético-MG",
    opponent: "Atlético-MG",
    date: "15 Out 2025",
    time: "16:00",
    location: "Mineirão",
    category: "masculino",
    competition: "Campeonato Brasileiro",
    ticketsAvailable: 1200,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Cruzeiro vs Flamengo",
    opponent: "Flamengo",
    date: "22 Out 2025",
    time: "19:00",
    location: "Mineirão",
    category: "masculino",
    competition: "Campeonato Brasileiro",
    ticketsAvailable: 0,
    status: "sold-out",
  },
  {
    id: "3",
    title: "Cruzeiro vs Palmeiras",
    opponent: "Palmeiras",
    date: "29 Out 2025",
    time: "18:30",
    location: "Mineirão",
    category: "masculino",
    competition: "Campeonato Brasileiro",
    ticketsAvailable: 2500,
    status: "confirmed",
  },
  {
    id: "4",
    title: "Cruzeiro vs Corinthians (Feminino)",
    opponent: "Corinthians",
    date: "18 Out 2025",
    time: "15:00",
    location: "Toca da Raposa II",
    category: "feminino",
    competition: "Brasileiro Feminino",
    ticketsAvailable: 800,
    status: "upcoming",
  },
  {
    id: "5",
    title: "Cruzeiro vs América-MG (Feminino)",
    opponent: "América-MG",
    date: "25 Out 2025",
    time: "16:00",
    location: "Toca da Raposa II",
    category: "feminino",
    competition: "Brasileiro Feminino",
    ticketsAvailable: 600,
    status: "upcoming",
  },
  {
    id: "6",
    title: "Cruzeiro vs Atlético-MG (Sub-20)",
    opponent: "Atlético-MG",
    date: "20 Out 2025",
    time: "15:00",
    location: "Toca da Raposa I",
    category: "base",
    competition: "Campeonato Mineiro Sub-20",
    ticketsAvailable: 400,
    status: "upcoming",
  },
  {
    id: "7",
    title: "Cruzeiro vs Fluminense (Sub-17)",
    opponent: "Fluminense",
    date: "27 Out 2025",
    time: "14:00",
    location: "Toca da Raposa I",
    category: "base",
    competition: "Copa do Brasil Sub-17",
    ticketsAvailable: 300,
    status: "confirmed",
  },
];

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  const filteredEvents =
    selectedCategory === "todos"
      ? mockEvents
      : mockEvents.filter((event) => event.category === selectedCategory);

  const getCategoryBadge = (category: string) => {
    const badges = {
      masculino: {
        label: "Masculino",
        className: "bg-primary text-primary-foreground",
      },
      feminino: {
        label: "Feminino",
        className: "bg-secondary text-secondary-foreground",
      },
      base: { label: "Base", className: "bg-accent text-accent-foreground" },
    };
    return badges[category as keyof typeof badges];
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      upcoming: {
        label: "Em Breve",
        className: "bg-muted text-muted-foreground",
      },
      confirmed: {
        label: "Confirmado",
        className: "bg-primary/20 text-primary",
      },
      "sold-out": {
        label: "Esgotado",
        className: "bg-destructive/20 text-destructive",
      },
    };
    return badges[status as keyof typeof badges];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Eventos e Jogos
          </h1>
          <p className="text-muted-foreground">
            Acompanhe todos os jogos do Cruzeiro e garanta seu ingresso com
            prioridade
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">7</p>
                  <p className="text-sm text-muted-foreground">
                    Próximos Jogos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">5.800</p>
                  <p className="text-sm text-muted-foreground">
                    Ingressos Disponíveis
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Estádios</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <Card className="premium-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">
              Filtrar por Categoria
            </h3>
          </div>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="masculino">Masculino</TabsTrigger>
              <TabsTrigger value="feminino">Feminino</TabsTrigger>
              <TabsTrigger value="base">Base</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredEvents.map((event) => {
          const categoryBadge = getCategoryBadge(event.category);
          const statusBadge = getStatusBadge(event.status);

          return (
            <Card key={event.id} className="premium-card hover-scale">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">
                      {event.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={categoryBadge.className}>
                        {categoryBadge.label}
                      </Badge>
                      <Badge className={statusBadge.className}>
                        {statusBadge.label}
                      </Badge>
                      <Badge variant="outline">{event.competition}</Badge>
                    </div>
                  </div>
                  <Button
                    variant={
                      event.status === "sold-out" ? "outline" : "default"
                    }
                    disabled={event.status === "sold-out"}
                  >
                    {event.status === "sold-out"
                      ? "Esgotado"
                      : "Reservar Ingresso"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.ticketsAvailable > 0
                        ? `${event.ticketsAvailable} ingressos`
                        : "Esgotado"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <Card className="premium-card">
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Nenhum evento encontrado para esta categoria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Events;
