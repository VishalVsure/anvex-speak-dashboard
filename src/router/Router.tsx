import App from "@/App";
import Dashboard from "@/pages/Dashboard";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import { Route, Routes } from "react-router-dom";

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);

export default Router;
