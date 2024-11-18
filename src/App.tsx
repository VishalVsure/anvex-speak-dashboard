import LoginPage from "./pages/Login";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <div className="flex flex-col items-center px-16 py-8">
        <img src="anvex-logo-png.png" alt="Anvex Logo" className="w-1/3 pb-8" />
        {/* <div className="flex gap-6">
        <Button onClick={() => navigate("/signup")}>Signup</Button>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div> */}
        <LoginPage />
      </div>
      <Footer />
    </>
  );
}

export default App;
