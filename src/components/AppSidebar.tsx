import {
  Book,
  Bot,
  ChartNoAxesCombined,
  CircleUserRound,
  Headset,
  PhoneCall,
  UsersRound,
  Wallet,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Agent",
    url: "#",
    icon: Bot,
  },
  {
    title: "Knowledge Base",
    url: "knowledge-base",
    icon: Book,
  },
  {
    title: "Batch Calling",
    url: "batch-calling",
    icon: Headset,
  },
  {
    title: "Call Logs",
    url: "call-logs",
    icon: PhoneCall,
  },
  {
    title: "Reports",
    url: "call-records",
    icon: ChartNoAxesCombined,
  },
  {
    title: "User Management",
    url: "user-management",
    icon: UsersRound,
  },
  {
    title: "Profile",
    url: "about-us",
    icon: CircleUserRound,
  },
  {
    title: "Billing",
    url: "#",
    icon: Wallet,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
