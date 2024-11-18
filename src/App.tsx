import LoginPage from "./pages/Login";
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center px-16 py-8">
        <img src="anvex-logo-png.png" alt="Anvex Logo" className="w-1/3 pb-8" />
        <LoginPage />
      </div>
      <Footer />
    </>
  );
}

export default App;
