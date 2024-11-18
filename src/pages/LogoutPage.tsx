import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear the 'email' key from localStorage
    localStorage.removeItem("email");

    // Set 'isLogin' to false in localStorage
    localStorage.setItem("isLogin", "false");

    // Optionally, redirect to login page
    navigate("/login");
  };

  // Call the logout function as soon as the component is mounted
  useEffect(() => {
    logout();
  }, []);

  return <div>Logging out...</div>; // Display a message while logging out
};

export default LogoutPage;
