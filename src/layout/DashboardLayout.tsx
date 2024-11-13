import Sidebar from "@/components/Sidebar";
import React from "react";
import { Toaster } from "@/components/ui/sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6 p-4 overflow-y-auto">
        {children}
        <Toaster />
      </div>
    </div>
  );
};

export default DashboardLayout;
