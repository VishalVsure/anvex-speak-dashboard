import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout actions
    localStorage.removeItem("email");
    localStorage.setItem("isLogin", "false");

    // Navigate to the login page
    navigate("/");
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default LogoutPage;
