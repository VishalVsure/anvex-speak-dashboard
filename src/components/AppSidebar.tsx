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

// Menu items.
const items = [
  {
    title: "Agent",
    url: "#",
    icon: Bot,
  },
  {
    title: "Knowledge Base",
    url: "#",
    icon: Book,
  },
  {
    title: "Batch Calling",
    url: "#",
    icon: Headset,
  },
  {
    title: "Call Logs",
    url: "#",
    icon: PhoneCall,
  },
  {
    title: "Reports",
    url: "#",
    icon: ChartNoAxesCombined,
  },
  {
    title: "User Management",
    url: "#",
    icon: UsersRound,
  },
  {
    title: "Profile",
    url: "#",
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
