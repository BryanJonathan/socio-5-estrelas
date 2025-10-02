import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Trophy, Users, Heart, Ticket } from "lucide-react";
import { ROUTES } from "@/utils/consts";
import { useAuthStore } from "@/stores/authStore";

const Index = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <Star className="h-7 w-7 text-primary-foreground fill-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-tight">
                Sócio Torcedor
              </span>
              <span className="text-sm text-primary font-semibold leading-tight">
                Cruzeiro
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Button asChild>
                  <Link to={ROUTES.PANEL}>Meu perfil</Link>
                </Button>
                <Button variant="link" onClick={handleLogout}>
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to={ROUTES.LOGIN}>Login</Link>
                </Button>
                <Button asChild>
                  <Link to={ROUTES.REGISTER}>Se inscreva</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in duration-700">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-accent/50 backdrop-blur-sm border border-border">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-sm font-medium">
              Mais que torcedor. Sócio Cruzeiro.
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Seja Sócio
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Do Maior de Minas
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Faça parte da maior nação do futebol mineiro. Acesso exclusivo a
            jogos, descontos especiais e muito mais. Junte-se aos milhões de
            cruzeirenses!
          </p>

          <div className="flex items-center justify-center space-x-4 pt-4">
            <Button size="lg" asChild className="gap-2">
              <Link to={ROUTES.REGISTER}>
                <Heart className="h-5 w-5" />
                Quero ser sócio
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to={ROUTES.LOGIN}>Já sou sócio</Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 pt-16">
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border space-y-3 hover:shadow-xl transition-all">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Ticket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Ingressos Exclusivos</h3>
              <p className="text-sm text-muted-foreground">
                Acesso prioritário para compra de ingressos de todos os jogos
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border space-y-3 hover:shadow-xl transition-all">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Benefícios Exclusivos</h3>
              <p className="text-sm text-muted-foreground">
                Descontos em produtos oficiais e experiências únicas
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border space-y-3 hover:shadow-xl transition-all">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Comunidade Celeste</h3>
              <p className="text-sm text-muted-foreground">
                Faça parte da maior torcida de Minas Gerais
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Star className="h-5 w-5 text-primary fill-primary" />
            <span className="font-semibold text-primary">
              Cruzeiro Esporte Clube
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Sócio Torcedor Cruzeiro. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
