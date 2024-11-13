import App from "@/App";
import AgentConfiguration from "@/pages/AgentConfiguration";
import AgentCreation from "@/pages/AgentCreation";
import Dashboard from "@/pages/Dashboard";
import GoogleSheetSetup from "@/pages/GoogleSheetSetup";
import KnowledgeBaseUpload from "@/pages/KnowledgeBase";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import VoiceSelection from "@/pages/VoiceSelect";
import Settings from "@/pages/Settings";
import { Route, Routes } from "react-router-dom";

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/knowledge-base" element={<KnowledgeBaseUpload />} />
    <Route path="/agent-voices" element={<VoiceSelection />} />
    <Route path="/interaction" element={<GoogleSheetSetup />} />
    <Route path="/agent-creation" element={<AgentCreation />} />
    <Route path="/agent-config" element={<AgentConfiguration />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
);

export default Router;
