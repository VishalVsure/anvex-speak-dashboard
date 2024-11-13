import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";

function App() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center px-16 py-8">
      <p className="text-4xl font-bold pt-56 pb-8">
        Welcome to <span className="text-red-500">Anvex Speak ☎</span>
      </p>
      <div className="flex gap-6">
        <Button onClick={() => navigate("/signup")}>Signup</Button>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </div>
  );
}

export default App;
