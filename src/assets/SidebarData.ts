interface SidebarData {
  title: string;
  slug: string;
}

export const sidebarData: SidebarData[] = [
  { title: "Home", slug: "instructions" },
  { title: "Upload", slug: "uploadFile" },
  { title: "Call Logs", slug: "call-records" },
  // { title: "About Us", slug: "about-us" },
  // { title: "Knowledge Base", slug: "knowledge-base" },
  // { title: "Agent Voices", slug: "agent-voices" },
  // { title: "List of Interactions", slug: "interaction" },
  // { title: "Agent Creations", slug: "agent-creation" },
  // { title: "Agent Configuration", slug: "agent-config" },
  // { title: "Settings", slug: "settings" }
];

export const sidebarFoot: SidebarData[] = [
  { title: "About Us", slug: "about-us" },
  { title: "Logout", slug: "logout" },
];

export default sidebarData;
