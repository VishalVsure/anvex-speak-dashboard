import * as React from "react";
import {
  Book,
  Bot,
  ChartNoAxesCombined,
  CircleUserRound,
  GalleryVerticalEnd,
  Headset,
  PhoneCall,
  UsersRound,
  Wallet,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "",
    email: "vcs@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "VCS",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Agent",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Configuration",
          url: "#",
        },
        {
          title: "Listing",
          url: "#",
        },
      ],
    },
    {
      title: "Knowledge Base",
      url: "#",
      icon: Book,
      items: [
        {
          title: "Knowledge Source",
          url: "#",
        },
        {
          title: "Knowledge Configuration",
          url: "#",
        },
      ],
    },
    {
      title: "Batch Calling",
      url: "#",
      icon: Headset,
      items: [
        {
          title: "Start Campaign",
          url: "#",
        },
      ],
    },
    {
      title: "Call Logs",
      url: "#",
      icon: PhoneCall,
      items: [
        {
          title: "Caller List",
          url: "#",
        },
        {
          title: "Campaign",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: ChartNoAxesCombined,
      items: [
        {
          title: "Caller List",
          url: "#",
        },
        {
          title: "Campaign",
          url: "#",
        },
      ],
    },
    {
      title: "User Management",
      url: "#",
      icon: UsersRound,
      items: [
        {
          title: "Caller List",
          url: "#",
        },
        {
          title: "Campaign",
          url: "#",
        },
      ],
    },
    {
      title: "Profile",
      url: "#",
      icon: CircleUserRound,
      items: [
        {
          title: "Caller List",
          url: "#",
        },
        {
          title: "Campaign",
          url: "#",
        },
      ],
    },
    {
      title: "Billing",
      url: "#",
      icon: Wallet,
      items: [
        {
          title: "Caller List",
          url: "#",
        },
        {
          title: "Campaign",
          url: "#",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const activeTeam = data.teams[0];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row py-4 px-4">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <activeTeam.logo className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{activeTeam.name}</span>
          <span className="truncate text-xs">{activeTeam.plan}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
