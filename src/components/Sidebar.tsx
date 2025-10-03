import { AppSidebar } from "@/components/AppSideBar";
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <main className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center border-b border-border bg-card/80 backdrop-blur-sm px-4">
            <SidebarTrigger className="text-foreground hover:bg-accent rounded-md" />
          </header>

          <div className="flex-1 p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Sidebar;
