import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/AppSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-w-full p-4 overflow-y-auto">
        <SidebarTrigger />
        {children}
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
