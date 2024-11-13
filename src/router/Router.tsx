import App from "@/App";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import { Route, Routes } from "react-router-dom";

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
  </Routes>
);

export default Router;
