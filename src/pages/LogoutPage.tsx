import { log_out } from "@/state/user/UserSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(log_out());
    navigate("/");
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default LogoutPage;
