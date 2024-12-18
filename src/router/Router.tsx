import App from "@/App";
import Dashboard from "@/pages/Dashboard";
import SignupPage from "@/pages/Signup";
import { Route, Routes } from "react-router-dom";
import AboutUs from "@/pages/AboutUs";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "@/layout/DashboardLayout";
import CallLogs from "@/pages/CallLogs";
import UserManagement from "@/pages/UserManagement";
import KnowledgeBase from "@/pages/KnowledgeBase";
import BatchCalling from "@/pages/BatchCalling";

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/call-logs" element={<CallLogs />} />
    <Route path="/user-management" element={<UserManagement />} />
    <Route path="/knowledge-base" element={<KnowledgeBase />} />
    <Route path="/batch-calling" element={<BatchCalling />} />
    <Route element={<PrivateRoute />}>
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route element={<DashboardLayout />}>
        <Route path="/sova" element={<SignupPage />} />
        <Route path="/call-records" element={<Dashboard />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Route>
    </Route>
  </Routes>
);

export default Router;
