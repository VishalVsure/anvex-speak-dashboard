import App from "@/App";
import AgentConfiguration from "@/pages/AgentConfiguration";
import AgentCreation from "@/pages/AgentCreation";
import Dashboard from "@/pages/Dashboard";
import GoogleSheetSetup from "@/pages/GoogleSheetSetup";
import KnowledgeBaseUpload from "@/pages/KnowledgeBase";
import SignupPage from "@/pages/Signup";
import VoiceSelection from "@/pages/VoiceSelect";
import Settings from "@/pages/Settings";
import { Route, Routes } from "react-router-dom";
import HomeInstructions from "@/pages/HomeInstructions";
import AboutUs from "@/pages/AboutUs";
import LogoutPage from "@/pages/LogoutPage";
import PrivateRoute from "./PrivateRoute";

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route element={<PrivateRoute />}>
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/sova" element={<SignupPage />} />
      <Route path="/call-records" element={<Dashboard />} />
      <Route path="/instructions" element={<HomeInstructions />} />
      <Route path="/knowledge-base" element={<KnowledgeBaseUpload />} />
      <Route path="/agent-voices" element={<VoiceSelection />} />
      <Route path="/uploadFile" element={<GoogleSheetSetup />} />
      <Route path="/agent-creation" element={<AgentCreation />} />
      <Route path="/agent-config" element={<AgentConfiguration />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/logout" element={<LogoutPage />} />
    </Route>
  </Routes>
);

export default Router;
