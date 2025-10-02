import { AppSidebar } from "@/components/AppSideBar";
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  );
};

export default Sidebar;
