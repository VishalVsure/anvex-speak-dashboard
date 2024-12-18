import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const PrivateRoute: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const isLogin: boolean = token.length === 0 ? false : true;

  return isLogin ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
