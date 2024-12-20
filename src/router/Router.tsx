import React from "react";
import App from "@/App";
import Dashboard from "@/pages/Dashboard";
import SignupPage from "@/pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import AboutUs from "@/pages/AboutUs";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "@/layout/DashboardLayout";
import CallLogs from "@/pages/CallLogs";
import UserManagement from "@/pages/UserManagement";
import KnowledgeBase from "@/pages/KnowledgeBase";
import BatchCalling from "@/pages/BatchCalling";
import LoginPage from "@/pages/Login";
import { Reports } from "@/pages/Reports";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Company from "@/pages/Company";

const Router: React.FC = () => {
  const isLogin = useSelector(
    (state: RootState) => state.user.token.length > 0
  );

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={isLogin ? <Navigate to="/call-records" replace /> : <App />}
      />
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/call-logs" element={<CallLogs />} />
          <Route path="/company" element={<Company />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/batch-calling" element={<BatchCalling />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/sova" element={<SignupPage />} />
          <Route path="/call-records" element={<Dashboard />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
