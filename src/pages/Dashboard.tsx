import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const username = useSelector((state: RootState) => state.user.username);
  return <div>sup {username}</div>;
};

export default Dashboard;
