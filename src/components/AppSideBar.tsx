import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronUp,
  User2,
  Home,
  Gift,
  Calendar,
  Star,
  LogOut,
} from "lucide-react";
import { ROUTES } from "@/utils/consts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/authStore";

const sidebarItems = [
  {
    title: "Início",
    url: ROUTES.PANEL,
    icon: Home,
  },
  {
    title: "Meu Perfil",
    url: ROUTES.PROFILE,
    icon: User2,
  },
  {
    title: "Benefícios",
    url: ROUTES.BENEFITS,
    icon: Gift,
  },
  {
    title: "Eventos",
    url: ROUTES.EVENTS,
    icon: Calendar,
  },
  // {
  //   title: "Configurações",
  //   url: ROUTES.HOME,
  //   icon: Settings,
  // },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const logout = useAuthStore((state) => state.logout);
  const isCollapsed = state === "collapsed";

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar
      className={`border-sidebar-border ${isCollapsed ? "w-14" : "w-64"}`}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-4">
          {!isCollapsed && (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero">
                <Star className="h-5 w-5 text-primary-foreground fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-sidebar-foreground">
                  Cruzeiro EC
                </span>
                <span className="text-xs text-muted-foreground">
                  Sócio 5 Estrelas
                </span>
              </div>
            </>
          )}
          {isCollapsed && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero mx-auto">
              <Star className="h-4 w-4 text-primary-foreground fill-current" />
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-sidebar-accent/50 transition-colors">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                  </Avatar>
                  {!isCollapsed && (
                    <>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">João Silva</span>
                        <span className="text-xs text-muted-foreground">
                          Sócio 5★
                        </span>
                      </div>
                      <ChevronUp className="ml-auto h-4 w-4" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-56 bg-popover border border-border rounded-lg shadow-lg p-1"
              >
                {/* <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent cursor-pointer">
                  <User2 className="h-4 w-4" />
                  <span>Minha Conta</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent cursor-pointer">
                  <Settings className="h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-destructive/10 text-destructive cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
