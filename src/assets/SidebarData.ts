interface SidebarData {
  title: string;
  slug: string;
}

const sidebarData: SidebarData[] = [
  { title: "Home", slug: "instructions" },
  { title: "Upload List of calls", slug: "uploadFile" },
  { title: "Call Records", slug: "call-records" },
  { title: "About Us", slug: "agent-creation" },
  // { title: "Knowledge Base", slug: "knowledge-base" },
  // { title: "Agent Voices", slug: "agent-voices" },
  // { title: "List of Interactions", slug: "interaction" },
  // { title: "Agent Creations", slug: "agent-creation" },
  // { title: "Agent Configuration", slug: "agent-config" },
  // { title: "Settings", slug: "settings" }
];

export default sidebarData;
